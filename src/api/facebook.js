export async function sendFacebookMessage(recipientId, text, token) {
    const url = `https://graph.facebook.com/v17.0/me/messages?access_token=${token}`;
    const payload = {
      recipient: { id: recipientId },
      message: { text },
    };
  
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  
    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || "Unknown error");
    return data;
  }