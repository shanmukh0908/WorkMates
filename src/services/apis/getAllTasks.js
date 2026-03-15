import api from "./axios";

const getAllTasks = async (data = {}) => {
  const params = { ...data };
  console.log(params,"****")

  for (const key in params) {
  const value = params[key];
  
  if (typeof value === "object" && value !== null) {
    if (key === "amountOffered") {
      
      params[key] = JSON.stringify(value).replaceAll(`"`, "");
    } else {
      params[key] = JSON.stringify(value);
    }
  }
}


  try {
    const res = await api.get("/tasks",  {params} );
    console.log("✅ All tasks fetched successfully");
    return res.data;
  } catch (err) {
    console.error("❌ Could not fetch tasks:", err.response?.data || err.message);
    throw err;
  }
};

export default getAllTasks;
