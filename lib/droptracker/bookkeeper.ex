defmodule Droptracker.Bookkeeper do
  use GenServer

  def start_link() do
    GenServer.start_link(__MODULE__, %{}, name: __MODULE__)
  end

  def init() do
    {:ok, %{}}
  end

  def handle_cast({:add_drop, drop, quantity, room}, state) do
    users_in_room = GenServer.call(Droptracker.Roomkeeper, {:users_in_room, room})

    Enum.each(users_in_room, &(send(&1, {:add_drop, drop, quantity})))

    spawn(fn() -> send_price(users_in_room, Map.get(drop, "id")) end)

    new_state = Map.update(state, room, [{drop, quantity}], &([{drop, quantity}] ++ &1))

    {:noreply, new_state}
  end

  def handle_cast({:sync_new_user, room, from}, state) do
    case Map.get(state, room) do
      nil ->
        :ok
      drops ->
        Enum.each(drops, fn(drop) ->
          {dropMap, quantity} = drop
          send(from, {:add_drop, dropMap, quantity})
        end)
    end

    {:noreply, state}
  end

  defp send_price(users, id) do
    :ok
  end
end