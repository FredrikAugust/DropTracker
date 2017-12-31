defmodule Droptracker.Realtime do
  @behaviour :cowboy_websocket_handler

  def init(_, _req, _opts) do
    {:upgrade, :protocol, :cowboy_websocket}
  end

  @timeout 60000 # terminate if no activity for one minute

  # Called on websocket connection initialization.
  def websocket_init(_type, req, _opts) do
    {:ok, req, %{}, @timeout}
  end
  
  # Handle 'ping' messages from the browser - reply
  def websocket_handle({:text, content}, req, state) do
    case Poison.decode(content) do
      {:ok, data} ->
        IO.puts("Received new command")
        IO.inspect(data)
        {:reply, handle_command(data), req, state}
      _ ->
        {:reply, {:text, "Invalid request."}, req, state}
    end
  end

  # Format and forward elixir messages to client
  def websocket_info({:add_drop, drop, quantity}, req, state) do
    {:ok, response} = Poison.encode(%{"command" => "add_drop", "drop" => drop, "quantity" => quantity})
    {:reply, {:text, response}, req, state}
  end

  def websocket_info(_, req, state) do
    {:noreply, req, state}
  end

  # No matter why we terminate, remove all of this pids subscriptions
  def websocket_terminate(_reason, _req, _state) do
    GenServer.cast(Droptracker.Roomkeeper, {:leave, self()})
    :ok
  end

  defp handle_command(%{"command" => "join", "room" => room}) do
    GenServer.cast(Droptracker.Roomkeeper, {:join, room, self()})
    GenServer.cast(Droptracker.Bookkeeper, {:sync_new_user, room, self()})
    {:ok, response} = Poison.encode(%{"info" => "Joined channel."})
    {:text, response}
  end

  defp handle_command(%{"command" => "add_drop", "drop" => drop, "quantity" => quantity, "room" => room}) do
    GenServer.cast(Droptracker.Bookkeeper, {:add_drop, drop, quantity, room})
    {:ok, response} = Poison.encode(%{"info" => "Added item."})
    {:text, response}
  end

  defp handle_command(%{"command" => "price", "itemID" => item_id, "quantity" => quantity}) do
    jsonResponse = HTTPotion.get("https://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=" <> Integer.to_string(item_id)).body
               |> Poison.decode!

    price = Map.get(jsonResponse, "item") |> Map.get("current") |> Map.get("price")
    {:ok, response} = Poison.encode(%{"command" => "price", "price" => price, "item_id" => item_id, "quantity" => quantity})

    {:text, response}
  end

  defp handle_command(_) do
    {:ok, response} = Poison.encode(%{"error" => "Invalid request."})
    {:text, response}
  end
end