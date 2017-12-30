defmodule Droptracker.Router do
  use Plug.Router

  plug Plug.Static, at: "/", from: :droptracker,
    only: ~w(css room.html)

  plug :match
  plug :dispatch

  get "/" do
    send_file(conn, 200, "priv/static/room.html")
  end
end