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

    new_state = Map.update(state, room, [{drop, quantity}], &([{drop, quantity}] ++ &1))

    IO.inspect(new_state)

    {:noreply, new_state}
  end

  def handle_cast({:sync_new_user, room, from}, state) do
    drops = Map.get(state, room)

    Enum.each(drops, fn(drop) ->
      {dropMap, quantity} = drop
      send(from, {:add_drop, dropMap, quantity})
    end)

    {:noreply, state}
  end
end