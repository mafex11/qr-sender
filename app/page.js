"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import io from "socket.io-client";

export default function Home() {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/generate")
      .then((res) => res.json())
      .then(({ url, sessionId }) => {
        setSessionId(sessionId);
        QRCode.toDataURL(url).then((dataUrl) => setQrCodeUrl(dataUrl));

        const socket = io();
        socket.on(`update-${sessionId}`, (message) => {
          setMessage(message);
        });

        return () => socket.disconnect();
      });
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Scan this QR Code:</h1>
      {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" />}
      <h2>Received Message:</h2>
      <p>{message || "Waiting for a message..."}</p>
    </div>
  );
}
