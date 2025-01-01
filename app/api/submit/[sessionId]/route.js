import { Server } from "socket.io";

let io;
export const config = { api: { bodyParser: true, externalResolver: true } };

export async function POST(req, { params }) {
  const { sessionId } = params;
  const { message } = await req.json();

  if (io) {
    io.emit(`update-${sessionId}`, message);
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
}

export default function handler(req, res) {
  if (!io) {
    const server = res.socket.server;
    if (!server.io) {
      io = new Server(server);
      server.io = io;
    }
  }
}
