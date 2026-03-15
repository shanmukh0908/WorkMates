/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */


import {  useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./ProfileSettingsPage.module.css";
import { useUpdateUserProfile } from "../../../hooks/user/useUpdateUserProfile";
// import updateUserProfile from "../../../services/apis/updateUserProfile";




export default function ProfileSettingsPage(){
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
   const { mutate: updateProfile, isPending } = useUpdateUserProfile();


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    mode: "onBlur", 
  });

  const handleImageChange = (e) => {
  const file = e.target.files?.[0];
  console.log("insdie handle change",file)
  if (!file) return;

  const previewUrl = URL.createObjectURL(file);
  setImagePreview(previewUrl);
};

   useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const onSubmit = (data) => {
    const profilePhoto = data.profilePhoto?.[0];

    updateProfile(
      {
        name: data.name,
        profilePhoto,
      },
      {
        onSuccess: () => {
          reset();
          navigate("/");
        },
        onError: (err) => {
          console.error("Error updating user details:", err);
        },
      }
    );
  };
   return (
    <div className={styles.formContainer}>
      <h2>Update Profile</h2>

      <form
        className={styles.profileSettingsForm}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.inputBox1}>
          <label htmlFor="profilePhoto">profilePhoto</label>
          <input
            type="file"
            accept="image/*"
            className={styles.profilePhoto}
            id="profilePhoto"
            {...register("profilePhoto")}
            onChange={handleImageChange}
          />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="preview"
              className={styles.previewImage}
            />
          )}
        </div>

        <div className={styles.inputBox2}>
          <label htmlFor="name">name</label>
          <input
            className={styles.name}
            placeholder="your name"
            id="name"
            {...register("name")}
          />
        </div>

        <button
          type="submit"
          className={styles.updateButton}
          disabled={isPending}
        >
          {isPending ? "Updating..." : "Submit"}
        </button>
      </form>
    </div>
  );
}