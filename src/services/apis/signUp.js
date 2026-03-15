/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */

import api from "./axios";

const signUp = async function (userData, file) {
  const formData = new FormData();

  formData.append("name", userData.name);
  formData.append("email", userData.email);
  formData.append("password", userData.password);
  formData.append("passwordConfirm", userData.passwordConfirm);

  if(userData.location){
    const [lat,lng] = userData.location.split(',').map(Number)
    const locationObj = {
      type: "Point",
      coordinates: [lng, lat], // longitude first
      address: userData.address || ""
    };
    formData.append("location",JSON.stringify(locationObj))
  }

  if (file) {
    formData.append("profilePhoto", file);
  }

  console.log([...formData])

  try {
    const res = await api.post("/users/signup", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Signup successful", res.data);
    return res;
  } catch (err) {
    console.error("Signup failed", err);
    throw err;
  }
};

export default signUp;
