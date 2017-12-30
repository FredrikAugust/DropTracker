defmodule Droptracker do
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      Plug.Adapters.Cowboy.child_spec(:http, Droptracker.Router, [], [
        dispatch: dispatch(),
        port: 4001
      ]) 
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
