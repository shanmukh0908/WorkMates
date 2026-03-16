import api from "./axios";
import axios from "axios";
// import imageCompression from "browser-image-compression";

export async function updateUserProfile({ name, profilePhoto, skills }) {
  // 1️⃣ Guard clause
  if (!name && !profilePhoto && (!skills || skills.length === 0)) {
    return;
  }

  const payload = {};

  if (name) payload.name = name;
  if (skills?.length > 0) payload.skills = skills;

  
  // CLOUDINARY UPLOAD (only if new file exists)
  if (profilePhoto) {
    try {
     
      const sigRes = await api.get("/users/cloudinary-signature", {
        params: { folder: "profile_photos" },
      });

      const {
        timestamp,
        signature,
        folder,
        cloudName,
        apiKey,
        public_id,
        overwrite,
        transformation
      } = sigRes.data.data;

      // Prepare Cloudinary upload form
      const cloudinaryFormData = new FormData();

      cloudinaryFormData.append("file", profilePhoto);
      cloudinaryFormData.append("folder", folder);
      cloudinaryFormData.append("timestamp", timestamp);
      cloudinaryFormData.append("api_key", apiKey);
      cloudinaryFormData.append("signature", signature);
      cloudinaryFormData.append("public_id", public_id);
      cloudinaryFormData.append("overwrite", overwrite);
      cloudinaryFormData.append("transformation", transformation);

      // Upload directly to Cloudinary
      const cloudinaryRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        cloudinaryFormData
      );

      const photoUrl = cloudinaryRes.data.secure_url;

      payload.profilePhoto = photoUrl;

      console.log("Photo uploaded directly to Cloudinary!");
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      throw new Error("Failed to upload profile photo");
    }
  }

 
  // SEND FINAL UPDATE TO BACKEND

  try {
    const res = await api.patch("/users/details", payload);

    return res.data.data.userData;
  } catch (error) {
    console.error("Failed to update user profile in backend:", error);
    throw error;
  }
}

