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

    {:noreply, state}
  end
end