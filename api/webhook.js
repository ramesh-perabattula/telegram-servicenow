export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    const body = req.body;

    console.log("Incoming Telegram Data:", JSON.stringify(body));

    const message = body?.message?.text || "No message";
    const chatId = body?.message?.chat?.id || "No chatId";

    console.log("Message:", message);
    console.log("Chat ID:", chatId);

    // 🔹 Call your ServiceNow API
    const response = await fetch(
      "https://dev184579.service-now.com/api/telegram_integration/receive",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

          // 🔐 OPTIONAL (Recommended)
          // Replace with your credentials
          // "Authorization": "Basic " + Buffer.from("username:password").toString("base64")
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.text();
    console.log("ServiceNow Response:", data);

    return res.status(200).json({
      status: "success",
      message: message,
    });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      status: "error",
      error: error.message ,
    });
  }
}