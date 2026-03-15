/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./EmailPasswordSettingsPage.module.css";
import updateUserDetails from "../../../services/apis/updateUserDetails";
import logout from "../../../services/apis/logout";

export default function EmailPasswordSettingsPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    mode: "onBlur", // better UX
  });

  // Watch password safely
  const newPassword = watch("password");

  // Clear confirmPassword if password is cleared
  useEffect(() => {
    if (!newPassword) {
      setValue("confirmPassword", "");
    }
  }, [newPassword, setValue]);

  const onSubmit = async (data) => {
    try {
      // const payload = {
      //   emailid: data.emailid,
      //   password: data.password,
      // };

      const res = await updateUserDetails(data);
      console.log(" update successful", res.data);
      await logout()

      reset();
      navigate("/");
      

    } catch (err) {
      console.error("Error updating user details:", err);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Update Email & Password</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* EMAIL */}
        <div className={styles.inputBox}>
          <label htmlFor="emailid">Email</label>
          <input
            type="email"
            id="emailid"
            placeholder="Enter your email id"
            className={styles.emailInput}
            {...register("emailid", {
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter a valid email address",
              },
            })}
          />

          {errors.emailid && (
            <p className={styles.error}>{errors.emailid.message}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div className={styles.inputBox}>
          <label htmlFor="password">Enter your currnet password</label>

          <input
            className={styles.newpassword}
            type="password"
            placeholder="currentPassword"
            id="currentPassword"
            {...register("currentPassword", {
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />

          <label htmlFor="password">Enter your new password</label>

          <input
            className={styles.newpassword}
            type="password"
            placeholder="Password"
            id="password"
            {...register("password", {
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />

          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}

          {/* CONFIRM PASSWORD */}
          {newPassword && (
            <input
              className={styles.newpassword}
              type="password"
              placeholder="Re-enter password"
              id="passwordConfirm"
              {...register("passwordConfirm", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              })}
            />
          )}

          {errors.confirmPassword && (
            <p className={styles.error}>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button type="submit" className={styles.updateButton}>
          Submit
        </button>
      </form>
    </div>
  );
}
