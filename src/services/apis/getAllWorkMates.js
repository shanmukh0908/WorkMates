import api from "./axios"

export default async function getAllWorkMates(data) {
  const params = { ...data };
  console.log(params, "**** from getAllworkmates");

  if (Array.isArray(params.location)) {
    params.location = `${params.location[0]},${params.location[1]}`;
    // params.location = `${params.location[0]},${params.location[1]}`;
  }

  try {
    const res = await api.get("/workmates", { params });
    console.log("✅ All workmates fetched successfully");
    return res.data;
  } catch (err) {
    console.error(
      "❌ Could not fetch workmates:",
      err.response?.data || err.message
    );
    throw err;
  }
}

