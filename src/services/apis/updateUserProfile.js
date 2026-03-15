import api from "./axios";

export async function updateUserProfile({ name, profilePhoto, skills }) {
  const formData = new FormData();

  if (!name && !profilePhoto && skills?.length === 0) {
    return;
  }

  if (name) formData.append("name", name);
  if (skills?.length > 0) formData.append("skills", skills);
  if (profilePhoto) formData.append("profilePhoto", profilePhoto);

  console.log(profilePhoto,"***pf")

  const res = await api.patch("/users/details", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.data.userData;
}



// import api from "./axios";
// import { queryClient } from "./queryClient";

// export default async function updateUserProfile({ name, profilePhoto, skills }) {
//   const formData = new FormData();
//   // console.log(skills)
//   if(!name && !profilePhoto && skills?.length === 0){
//     return
//   }

//   if(name){
//   formData.append("name", name);
//   }

//   if(skills?.length > 0){
//     formData.append("skills", skills);
//   }

//   if (profilePhoto) {
//       formData.append("profilePhoto", profilePhoto);
//   }

//   console.log(profilePhoto,"***pf")
  
//     try {
//     const res = await api.patch("/users/details", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     console.log("user profile update successful",res.data.data.userData);

//     // queryClient.invalidateQueries(["user"])
//     // queryClient.setQueryData(["user"],{...res.data.data.userData})
    
//     queryClient.setQueryData(["user"], (oldData) => {
//       if (!oldData) return {...res.data.data.userData}; // Fallback if cache was empty
//       return {
//         ...oldData,      // Keep everything else (id, email, ratings, etc.)
//         ...res.data.data.userData   // Overwrite only the changed fields (name, profilePhoto)
//       };
//     });

//     return res.data;
//   } catch (err) {
//     console.error("user profile update failed", err);
//     throw err;
//   }

  
// }