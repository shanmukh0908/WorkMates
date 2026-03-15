/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */

import { useForm, Controller } from "react-hook-form";
import styles from "./CreateTaskFormPage.module.css";
import CreatableSelect from "react-select/creatable";
import categories from "../../../categories";
import { useEffect, useState } from "react";
import { getCurrentLocation } from "../../services/apis/GeoLocationApi";
// import createTask from "../../services/apis/createTask";
import useCreateTask from "../../hooks/tasks/useCreateTask";

export default function CreateTaskFormPage() {
  const { mutate, isPending } = useCreateTask();
  const [categoryOptions] = useState(categories);
  const [location, setLocation] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);


  useEffect(() => {
    return () => imagePreviews.forEach(URL.revokeObjectURL);
  }, [imagePreviews]);


  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
    watch,
  } = useForm({ shouldUnregister: false });

  const taskLocationValue = watch("taskLocation");
 

  // Handle location button click
  const handleLocation = async () => {
    const loc = await getCurrentLocation();
    console.log(loc.lat,loc.lng)
    setLocation(loc);
    setValue("taskLocation", `${loc.lat}, ${loc.lng}`); 
  };

  // Handle file input change
const handleImageChange = (e) => {
  const files = Array.from(e.target.files); // convert FileList to array
  setValue("taskImages", files); // update react-hook-form value
  const previews = files.map(file => URL.createObjectURL(file));
  setImagePreviews(previews);
};

  // Form submit handler

const onSubmit = (data) => {
  console.log("data after submit before http",data)
  console.log("taskImages:", data.taskImages);
  const files = data.taskImages ? Array.from(data.taskImages) : [];
  mutate({ taskData: data, files });
};

  return (
    <div className={styles.formContainer}>
      
    <h2> Create Your Task </h2>

      <form className={styles.createTaskForm} onSubmit={handleSubmit(onSubmit)}>

        {/* Category Select */}
        <div className={`${styles.inputBox} ${styles.categoryBox}`}>
          <label htmlFor="category">Category:</label>
          <Controller
            name="category"
            control={control}
            rules={{ required: "Category cannot be left empty" }}
            render={({ field }) => (
              <CreatableSelect
              isClearable
              options={categoryOptions}
              placeholder="Select or type a category..."
              classNamePrefix="mySelect"
              value={categoryOptions.find(o => o.value === field.value) || null}
              onChange={(option) => field.onChange(option ? option.value : null)}
            />
            )}
          />
          {errors.category && <p className={styles.error}>{errors.category.message}</p>}
        </div>

        {/* Task Description */}
        <div className={`${styles.inputBox} ${styles.taskDescriptionBox}`}>
          <label htmlFor="taskDescription">Task Description:</label>
          <textarea
            id="taskDescription"
            placeholder="Enter description..."
            className={styles.taskDescription}
            {...register("taskDescription", { required: "Describe your task" })}
          />
          {errors.taskDescription && <p className={styles.error}>{errors.taskDescription.message}</p>}
        </div>

        {/* Task Images */}
        <div className={`${styles.inputBox} ${styles.taskImagesBox}`}>
          <label htmlFor="taskImages">Select task-related images:</label>
          <input
              type="file"
              accept="image/*"
              multiple
              className={styles.taskImages}
              id="taskImages"
              onChange={handleImageChange} // update previews
            />
          {errors.taskImages && <p className={styles.error}>{errors.taskImages.message}</p>}

          {/* Preview thumbnails */}
          {imagePreviews.length > 0 && (
            <div className={styles.previews}>
              {imagePreviews.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`preview-${idx}`}
                  className={styles.previewImage}
                />
              ))}
            </div>
            )}
        </div>

        {/* Amount Offered */}
        <div className={`${styles.inputBox} ${styles.amountOfferedBox}`}>
          <label htmlFor="amountOffered">Amount you offer:</label>
          <input
            type="number"
            className={styles.amountOffered}
            placeholder="Enter amount"
            id="amountOffered"
            {...register("amountOffered", { required: "Specify the amount you offer" })}
          />
          {errors.amountOffered && <p className={styles.error}>{errors.amountOffered.message}</p>}
        </div>

        {/* Negotiable Checkbox */}
        <div className={`${styles.inputBox} ${styles.negotiableBox}`}>
          <label htmlFor="negotiable">Negotiable:</label>
          <input type="checkbox" className={styles.negotiable} id="negotiable" {...register("negotiable")} />
        </div>

        {/* Location */}
        <div className={styles.locationBox}>
          <label htmlFor="taskLocation">Location:</label>
          <input
            type="text"
            id="taskLocation"
            className={styles.locationInput}
            {...register("taskLocation", { required: "Please click the current location button" })}
            readOnly
          />
          <button type="button" className={styles.locationButton} onClick={handleLocation}>
            Current Location
          </button>
          {errors.taskLocation && <p className={styles.error}>{errors.taskLocation.message}</p>}
        </div>

        <button 
          type="submit" 
          className={styles.signUpButton} 
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
