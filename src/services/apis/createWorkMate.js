import api from "./axios";

export default async function createWorkMate(data = {}) {
  const body = { ...data };
  console.log(body, "**** from createAllWorkMates");

  try {
    const res = await api.post("/workmates", body);
    console.log("✅ workmate created successfully");
    return res.data;
  } catch (err) {
    console.error(
      "❌ Could not create workmate:",
      err.response?.data || err.message
    );
    throw err;
  }
}
