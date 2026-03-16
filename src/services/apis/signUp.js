/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */

import api from "./axios";
import axios from "axios";


const signUp = async function (userData, file) {
  try {
    // =========================================================
    // STEP 1: Create User
    // =========================================================
    const payload = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      passwordConfirm: userData.passwordConfirm,
    };

    if (userData.location) {
      const [lat, lng] = userData.location.split(",").map(Number);

      payload.location = {
        type: "Point",
        coordinates: [lng, lat],
        address: userData.address || "",
      };
    }

    const signupRes = await api.post("/users/signup", payload);
    const accessToken = localStorage.getItem("accessToken")
    console.log("Step 1 Complete: Account created!",signupRes,accessToken);

    // store access token returned from backend
    if (signupRes.data?.accessToken) {
      localStorage.setItem("accessToken", signupRes.data.accessToken);
    }


    // =========================================================
    // STEP 2: Compress + Upload Profile Photo
    // =========================================================
    if (file) {

      // Get Cloudinary signature (token automatically added by interceptor)
      const sigRes = await api.get("/users/cloudinary-signature?folder=profile_photos");

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

      const cloudinaryFormData = new FormData();

      cloudinaryFormData.append("file", file);
      cloudinaryFormData.append("api_key", apiKey);
      cloudinaryFormData.append("timestamp", timestamp);
      cloudinaryFormData.append("signature", signature);
      cloudinaryFormData.append("folder", folder);
      cloudinaryFormData.append("public_id", public_id);
      cloudinaryFormData.append("overwrite", overwrite);
      cloudinaryFormData.append("transformation", transformation);

      const cloudinaryRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        cloudinaryFormData
      );

      // Save optimized photo URL
      const photoUrl = cloudinaryRes.data.secure_url;

      await api.patch("/users/details", {
        profilePhoto: photoUrl,
      });

      console.log("Step 2 Complete: Profile photo uploaded!");
    }

    return signupRes;
  } catch (err) {
    console.error("Signup failed", err);
    throw err;
  }
};

export default signUp;