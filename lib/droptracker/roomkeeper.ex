defmodule Droptracker.Roomkeeper do
  use GenServer

  def start_link() do
    GenServer.start_link(__MODULE__, %{}, name: __MODULE__)
  end

  def init() do
    {:ok, %{}}
  end

  def handle_call({:join, room}, from, state) do
    IO.puts("Joining room")
    updated_state = Map.update(state, room, [from], &(&1 ++ [from]))
    IO.inspect(updated_state)
    {:reply, :ok, updated_state}
  end

  def handle_call(:leave, from, state) do
    IO.puts("Leaving room")
    # check if pid is anywhere to be found
    {from_pid, _} = from

    {users_room, _} = Enum.find(state, fn(elem) ->
      {_, users} = elem
      users_pids = Enum.map(users, &(List.first(Tuple.to_list(&1))))
      Enum.any?(users_pids, fn(pid) -> pid == from_pid end)
    end)

    current_users = Map.get(state, users_room)
    updated_users = List.keydelete(current_users, from_pid, 0)

    updated_state = Map.update(state, users_room, [], fn(_) -> updated_users end)
    IO.inspect(updated_state)
    {:reply, :ok, updated_state}
  end
end