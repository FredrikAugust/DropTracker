defmodule Droptracker.Roomkeeper do
  use GenServer

  def start_link() do
    GenServer.start_link(__MODULE__, %{}, name: __MODULE__)
  end

  def init() do
    {:ok, %{}}
  end

  def handle_call({:users_in_room, room}, _, state) do
    {:reply, Map.get(state, room), state}
  end

  def handle_cast({:join, room, from}, state) do
    updated_state = Map.update(state, room, [from], &(&1 ++ [from]))
    {:noreply, updated_state}
  end

  def handle_cast({:leave, from_pid}, state) do
    find_result = Enum.find(state, fn(elem) ->
      {_, users_pids} = elem
      Enum.any?(users_pids, fn(pid) -> pid == from_pid end)
    end)

    case find_result do
      {users_room, _} ->
        updated_state = Map.update(state, users_room, [], &(&1 -- [from_pid]))
        {:noreply, updated_state}
      nil ->
        {:noreply, state}
    end
  end
end