defmodule Droptracker.Router do
  use Plug.Router

  plug Plug.Static, at: "/", from: :droptracker,
    only: ~w(css js room.html)

  plug :match
  plug :dispatch

  get "/" do
    send_resp(conn, 200, "To come someday")
  end

  get "/room/:_" do
    send_file(conn, 200, "priv/static/room.html")
  end

  match _ do
    send_resp(conn, 404, "Oh, well.. this is awkward.")
  end
end