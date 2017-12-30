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
        {:reply, handle_command(data), req, state}
      _ ->
        {:reply, {:text, "Invalid request."}, req, state}
    end
  end

  # Format and forward elixir messages to client
  def websocket_info(message, req, state) do
    {:reply, {:text, message}, req, state}
  end

  # No matter why we terminate, remove all of this pids subscriptions
  def websocket_terminate(_reason, _req, _state) do
    :ok
  end

  defp handle_command(%{"command" => "join", "room" => room}) do
    {:text, "Okidoki."}
  end

  defp handle_command(_) do
    {:text, "Invalid request"}
  end
end