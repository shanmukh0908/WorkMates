/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */

import { useForm } from "react-hook-form";
import styles from "./SignUpFormPage.module.css";
import { useEffect, useState } from "react";
import { getCurrentLocation} from '../../services/apis/GeoLocationApi'
import signUp from "../../services/apis/signUp";
import { useNavigate } from "react-router-dom";



export default function SignUpFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue 
  } = useForm();

  const profilePhotoFile = watch("profilePhoto");
  const navigate = useNavigate();

  const [location,setlocation] = useState()
  const [preview, setPreview] = useState(null);

  useEffect(() => {
  if (profilePhotoFile && profilePhotoFile.length > 0) {
    const file = profilePhotoFile[0];
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);

    return () => URL.revokeObjectURL(imageUrl); // cleanup
  } else {
    setPreview(null);
  }
}, [profilePhotoFile]);

 async function handleLocation(params) {
    const location = await getCurrentLocation()
    console.log(location)
    setlocation(location)
    if (location) {
    setValue("location", `${location.lat}, ${location.lng}`);
  }
  }

  const password = watch("password");
  

  const onSubmit = async (data) => {
    const file = data.profilePhoto?.[0] || null;
    const res = await signUp(data,file)
    console.log(data,file)
    console.log(res)
    localStorage.setItem('accessToken', res?.data?.accessToken || "");
    navigate("/")
  };

  return (
    <div className={styles.signUpContainer}>

      <div className={styles.logo}>
          <img src="/tmlogo27dec3.png" alt="logo" className={styles.logoImage} />
            <div className={styles.logoName}>
              <span className={styles.spanwork}>WORK </span>
              <span className={styles.spanmates}>MATES</span>
            </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className={styles.signupform}>
        <div className={styles.nameBox}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            className={styles.nameInput}
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div className={styles.emailBox}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className={styles.emailInput}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Enter a valid email",
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className={styles.passwordBox}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className={styles.passwordInput}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div className={styles.passwordBox}>
          <label htmlFor="passwordConfirm">Confirm Password:</label>
          <input
            type="password"
            id="passwordConfirm"
            className={styles.passwordInput}
            {...register("passwordConfirm", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}
        </div>

        <div className={styles.addressBox}>
          <label htmlFor="address">Address:</label>
          <textarea
            className={styles.addressInput}
            id="address"
            rows="4"
            cols="50"
            {...register("address", { required: "Please enter your address" })}
          />
          {errors.address && <p>{errors.address.message}</p>}
        </div>

        <div className={styles.locationBox}>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            className={styles.locationInput}
            {...register("location", {
              required: "Please click the current location button",
            })}
            // value={location ? `${location.lat}, ${location.lon}` : ""}
          />
          <button type="button" className={styles.locationButton} onClick={handleLocation}>
            Current Location
          </button>
          {errors.location && <p>{errors.location.message}</p>}
        </div>

        <div className={styles.profilePhotoBox}>
          <label htmlFor="profilePhoto" className={styles.profilePhotoSelectLabel}>Profile Photo:</label>
          <input
            type="file"
            accept="image/*"
            id="profilePhoto"
            className={styles.profilePhotoSelect}
            {...register("profilePhoto", {
              validate: {
                checkFileType: (files) =>
                  !files[0] ||
                  files[0]?.type.startsWith("image/") ||
                  "Only image files allowed",
                checkFileSize: (files) =>
                  !files[0] ||
                  files[0]?.size <= 2 * 1024 * 1024 ||
                  "File must be under 2MB",
              },
            })}
          />
          {errors.profilePhoto && <p>{errors.profilePhoto.message}</p>}
        </div>

          {preview && (
          <div className={styles.imagePreviewContainer}>
            <img
              src={preview}
              alt="Profile Preview"
              className={styles.imagePreview}
            />
          </div>
        )}

        <button type="submit" className={styles.signUpButton}>
          Sign Up
        </button>
      </form>
    </div>
  );
}


// import { useForm } from "react-hook-form"
// import styles from "./SignUpFormPage.module.css"
// export default function SignUpFormPage(){

//     const {register,handleSubmit,formState:{errors},watch} = useForm()
//     const password = watch('password')
//     return (
//     <div className={styles.signUpContainer}>

//         <div className={styles.logo}>
//             <img src="./tmlogov1.png" alt="logo" className={styles.logoImage}/>
//              <div className={styles.logoName}>
//                 <span className={styles.spanwork}>WORK </span>
//                 <span className={styles.spanmates}>MATES</span>
//           </div>
//         </div>

//         <div className = {styles.signupform}>
          
//             <div className = {styles.nameBox}>
//                 <label className = {styles.name} for="name">
//                     Name:
//                 </label>
//                 <input type="text" id="name" className = {styles.nameInput}/>
//             </div>

//             <div className = {styles.emailBox}>
//                 <label className = {styles.email} for="emailInput">email:</label>
//                 <input type="email" name="email" id="email" className = {styles.emailInput} {...register("email",{
//                     required:"email is required",
//                     pattern: {
//                         value: /^\S+@\S+$/i,
//                         message: "enter a valid email"
//                         }    
//                 })} />
//             </div>

//             <div className={styles.passwordBox}>
//                 <label for='password'> password:</label>
//                 <input type="text" name='password' id="password" className={styles.passwordInput} {...register("password",{
//                     required:'passwordconfirm is required',
//                     minLength:{
//                         value:6,
//                         message:"password must be at least 6 charecters"
//                     }
//                 })} />
//             </div>

//             <div className={styles.passwordBox}>
//                 <label for='passwordConfirm'> passwordConfirm:</label>
//                 <input type="text" name='passwordConfirm' id="passwordConfirm" className={styles.passwordInput} {
//                     ...register("passwordConfirm",{
//                         required:'passwordconfirm is required',
//                         validate: (value)=> value===password || "password and password confirm not matching"
//                     })
//                 } />
//             </div>
            
//             <div className = {styles.addressBox}>
//                 <label className = {styles.addressLabel} for="address">Address</label>
//                 <textarea name="address" id="address" rows="4" cols="50" {...register('address',{
//                     required:'please enter your address'
//                 })}></textarea>
//              </div>

//              <div className = {styles.locationBox}>
//                 <label for="location">location:</label>
//                 <input type="text" name="location" id="location" className={styles.locationInput} disabled {...register('address',{
//                     required:'please clcik the current location button to fill the location field'
//                 })}/>
//                 <button type="button" className = {styles.locationButton} >Current Location</button>
//             </div>

//             <div className={styles.profilePhotoBox}>
//                 <label>Profile Photo:</label>
//                 <input type="file" accept="image/*" id="profilePhoto" {...register("profilePhoto", { validate: {
//                                 checkFileType: (files) =>
//                                 files[0]?.type.startsWith("image/") || "Only image files allowed",
//                                 checkFileSize: (files) =>
//                                 files[0]?.size <= 2 * 1024 * 1024 || "File must be under 2MB",
//                             },
//                             })} />
//             </div>

//         </div>
    
//         <button className = {styles.signUpButton}>signUp</button>
//     </div>
//     )
// }
   