/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */

import { useForm, Controller } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import categories from "../../../categories";
import styles from "./createWorkMateFormPage.module.css";
import { useState } from "react";
import useCreateWorkMate from "../../hooks/workMates/useCreateWorkmate";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setWorkMate } from "../../features/userType/userTypeSlice";

export default function CreateWorkMateFormPage() {
  const dispatch = useDispatch()
  const [skillsOptions] = useState(() => categories());
  const navigate = useNavigate();
  const { handleSubmit, control, formState: { errors }, reset } = useForm();

  const { mutate, isPending, isError } = useCreateWorkMate(); 

  const onSubmit = (data) => {
    const payload = { skills: data.skills };

    mutate(payload, {
      onSuccess: () => {
        console.log("WorkMate created successfully");
        reset();
        dispatch(setWorkMate());
        navigate("/")
      },
    });
  };

  return (
    <div className={styles.formContainer}>
      <h2>PLEASE PROVIDE YOUR SKILLS</h2>

      <form className={styles.CreateWorkMateForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={`${styles.inputBox} ${styles.skillsBox}`}>
          <label>Skills:</label>

          <Controller
            name="skills"
            control={control}
            rules={{ required: "Skills cannot be empty" }}
            render={({ field }) => (
              <CreatableSelect
                isClearable
                isMulti
                options={skillsOptions}
                placeholder="Select or type skills..."
                classNamePrefix="mySelect"
                value={skillsOptions.filter(opt =>
                  field.value?.includes(opt.value)
                )}
                onChange={(options) => {
                  const values = options ? options.map(opt => opt.value) : [];
                  field.onChange(values);
                }}
              />
            )}
          />

          {errors.skills && <p className={styles.error}>{errors.skills.message}</p>}
        </div>

        <button type="submit" className={styles.skillButton} disabled={isPending}>
          {isPending ? "Creating..." : "Submit"}
        </button>

        {isError && <p className={styles.error}>Failed to create workmate</p>}
      </form>
    </div>
  );
}