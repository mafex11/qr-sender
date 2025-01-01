"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MobilePage({ params }) {
  const { sessionId } = params;
  const [message, setMessage] = useState("");

  const submitMessage = async (e) => {
    e.preventDefault();
    await fetch(`/api/submit/${sessionId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    alert("Message sent!");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Enter Message:</h1>
      <form onSubmit={submitMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
