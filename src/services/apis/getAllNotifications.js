import api from "./axios";
// import getUserIdFromToken from "./getUserIdFromToken";

export default async function getAllNotifications() {
//   const id = getUserIdFromToken();

//   const params = { to: id };

  try {
    // const res = await api.get("/notifications", { params });
    const res = await api.get("/notifications");
    console.log("✅ All notifications fetched successfully");
    return res.data;
  } catch (err) {
    console.error(
      "❌ Could not fetch notifications",
      err.response?.data || err.message
    );
    throw err;
  }
}