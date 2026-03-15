import api from "./axios";

export default async function updateTask(taskId, data) {
  try {
    const res = await api.patch(`/tasks/${taskId}`, data);
    console.log("✅ Update successful:", res.data);
    return res.data;
  } catch (err) {
    console.error("❌ Could not update the task:", err.response?.data || err.message);
    throw err;
  }
}
