export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).send("Webhook endpoint is live ✅");
  }

  try {
    const body = req.body;

    console.log("Telegram Data:", JSON.stringify(body));

    const message = body?.message?.text;
    const chatId = body?.message?.chat?.id;

    console.log("Message:", message);
    console.log("Chat ID:", chatId);

    // Call ServiceNow API
    await fetch("https://<YOUR_INSTANCE>.service-now.com/api/telegram_integration/receive", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    return res.status(200).json({ status: "ok" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}