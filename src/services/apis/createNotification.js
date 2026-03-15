import api from "./axios";

export default async function createNotification(message,toId) {

    const data = {
        message,to:toId
    }
    try {
    const res = await api.post("/notifications", data);
    console.log("notification sent successfully");
    return res.data;
  } catch (err) {
    console.error(
      "❌ Failed to send message",
      err.response?.data || err.message
    );
    throw err;
  }
}