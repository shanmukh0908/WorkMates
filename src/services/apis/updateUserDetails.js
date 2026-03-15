import api from "./axios";
// import logout from "./logout";

export default async function updateUserDetails(data) {
  try {
    const res = await api.patch("/users/emailpassword", data);

    console.log("✅ User details updated successfully");
    return res.data;
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "Failed to update user details";

    console.error("❌ Update failed:", errorMessage);

    throw new Error(errorMessage);
  }
}
