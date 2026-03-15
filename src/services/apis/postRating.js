import api from "./axios";

export default async function postRating(data = {}) {
  try {
    const res = await api.post("/ratings", data);
    console.log("⭐ Rating posted successfully");
    return res.data;
  } catch (err) {
    console.error(
      "❌ Failed to post rating:",
      err.response?.data || err.message
    );
    throw err;
  }
}