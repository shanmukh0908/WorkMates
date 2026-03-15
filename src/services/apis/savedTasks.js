import api from "./axios";

export const getSavedTasks = async () => {
  try {
    const res = await api.get("/savedtasks");
    console.log("✅ Saved tasks fetched successfully");
    console.log(res.data.data)
    return res.data?.data;
  } catch (err) {
    console.error("❌ Could not fetch saved tasks:", err.response?.data || err.message);
    throw err;
  }
};

export const createSavedTask = async (taskId) => {
  try {
    const res = await api.post("/savedtasks", { taskId });
    console.log("✅ Task saved successfully");
    return res.data;
  } catch (err) {
    console.error("❌ Could not save task:", err.response?.data || err.message);
    throw err;
  }
};

export const deleteSavedTask = async (taskId) => {
  try {
    const res = await api.delete(`/savedtasks/${taskId}`);
    console.log("✅ Task deleted successfully");
    return res.data;
  } catch (err) {
    console.error("❌ Could not delete saved task:", err.response?.data || err.message);
    throw err;
  }
};
