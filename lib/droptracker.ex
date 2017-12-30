defmodule Droptracker do
  @moduledoc false

  use Application

  def start(_type, _args) do
    port = case System.get_env("PORT") do
      nil ->
        4001
      string ->
        String.to_integer(string)
    end

    children = [
      Plug.Adapters.Cowboy.child_spec(:http, Droptracker.Router, [], [
        dispatch: dispatch(),
        port: port
      ]),
      Supervisor.Spec.worker(Droptracker.Roomkeeper, [], []),
      Supervisor.Spec.worker(Droptracker.Bookkeeper, [], [])
    ]

    opts = [strategy: :one_for_one, name: Droptracker.Supervisor]
    Supervisor.start_link(children, opts)
  end

  defp dispatch do
      [
        {:_, [
          {"/ws", Droptracker.Realtime, []},
          {:_, Plug.Adapters.Cowboy.Handler, {Droptracker.Router, []}}
        ]}
      ]
  end
end
