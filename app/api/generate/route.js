export async function GET(req) {
    const sessionId = Math.random().toString(36).substr(2, 9);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const url = `${baseUrl}/mobile/${sessionId}`;
    
    return new Response(JSON.stringify({ sessionId, url }), {
      headers: { "Content-Type": "application/json" },
    });
  }
  