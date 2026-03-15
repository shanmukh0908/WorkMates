/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */

import { useForm } from "react-hook-form";
import styles from "./LogInFormPage.module.css";
import { Link} from "react-router-dom";
import useLogin from "../../hooks/auth/useLogIn";

export default function LogInFormPage() {

  const { register, reset, formState: { errors }, handleSubmit } = useForm();
  const { mutate: login, isPending } = useLogin();

  const onSubmit = (data) => {
    login(data, {
      onSuccess: () => {
        reset(); // Clear form only on success
      }
    });
  };

  return (
    <div className={styles.logInContainer}>

      <div className={styles.logo}>
        <img src="/tmlogo27dec3.png" alt="logo" className={styles.logoImage} />
        <div className={styles.logoName}>
          <span className={styles.spanwork}>WORK </span>
          <span className={styles.spanmates}>MATES</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.logInform}>
        {/* same as handleSubmit((data)=>onSubmit(data)) */}

        {/* Email Field */}
        <div className={styles.emailBox}>
          <label htmlFor="email" className={styles.email}>Email:</label>
          <input
            type="email"
            id="email"
            className={styles.emailInput}
            {...register("email", {
              required: "Please enter your email"
            })}
          />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        </div>

        {/* Password Field */}
        <div className={styles.passwordBox}>
          <label htmlFor="password" className={styles.password}>Password:</label>
          <input
            type="password"
            id="password"
            className={styles.passwordInput}
            {...register("password", {
              required: "Please enter your password"
            })}
          />
          {errors.password && <p className={styles.error}>{errors.password.message}</p>}
        </div>

        <button type="submit" className={styles.logInButton}>
          {isPending ? "Logging in..." : "Log In"}
        </button>

        <Link to="/signup" className={styles.signUpLink}>
          Don’t have an account? <span>Sign up now</span>
        </Link>
      </form>
    </div>
  );
}
