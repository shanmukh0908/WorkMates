import api from "./axios";
import axios from "axios";

const createTask = async function (taskData, files) {
  try {
   
    const payload = {
      status: "open",
      category: taskData.category,
      taskDescription: taskData.taskDescription,
      negotiable: taskData.negotiable,
      amountOffered: taskData.amountOffered,
    };

    if (taskData.taskLocation) {
      const [lat, lng] = taskData.taskLocation.split(",").map(Number);
      payload.taskLocation = {
        type: "Point",
        coordinates: [lng, lat],
        address: taskData.address || "",
      };
    }

    let uploadedImageUrls = [];

   
    if (files && files.length > 0) {
      console.log(files)
      const sigRes = await api.get("/users/cloudinary-signature?folder=task_images");
      const { timestamp, signature, folder, cloudName, apiKey,transformation } = sigRes.data.data;

      
        const uploadPromises = Array.from(files).map((compressedFile) => {
        const cloudinaryFormData = new FormData();
        cloudinaryFormData.append("file", compressedFile);
        cloudinaryFormData.append("api_key", apiKey);
        cloudinaryFormData.append("timestamp", timestamp);
        cloudinaryFormData.append("signature", signature);
        cloudinaryFormData.append("folder", folder);
        cloudinaryFormData.append("transformation", transformation);
        

        return axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          cloudinaryFormData
        );
      });

     
      const uploadResults = await Promise.all(uploadPromises);
      // console.log(uploadResults,"********",uploadedImageUrls)
      uploadedImageUrls = uploadResults.map((res) => res.data.secure_url);
      if (uploadedImageUrls.length > 0) {
        payload.taskImages = uploadedImageUrls; 
      }
      // console.log(uploadResults,"********",uploadedImageUrls)

    }

    
   
    const res = await api.post("/tasks", payload);
    // console.log(payload)
    console.log("Task creation successful!");

    return res;
  } catch (err) {
    console.error("Task creation failed", err);
    throw err;
  }
};

export default createTask;