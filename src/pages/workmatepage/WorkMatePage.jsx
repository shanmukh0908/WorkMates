import { useLocation } from "react-router-dom";
import styles from "./WorkMatePage.module.css";
import Rating from "react-rating";
import postMessage from "../../services/apis/postMessage";
import { useForm } from "react-hook-form";


export default function WorkMatePage() {
  const loc = useLocation();
  const { workmate } = loc.state;
  const { register, handleSubmit, reset } = useForm();

async function onSubmit(formData) {
    try {
      const payload = {
        to: workmate?.workMate._id,
        message: formData.message,
      };
      await postMessage(payload);
      console.log("✅ Message sent:", payload);
      reset(); 
    } catch (err) {
      console.error("❌ Failed to send message:", err);
    }
  }

  
let profilePhoto = workmate?.workMate?.profilePhoto

  return (
    <div className={styles.container}>

            <div className={styles.workmatecontainer}>

                <img
                    src={
                        profilePhoto ?
                        (profilePhoto.startsWith("https://res.cloudinary.com") ? `${workmate.workMate.profilePhoto}`  : `http://localhost:3000/public/profilephotos/${workmate.workMate.profilePhoto}`)
                        : "/tmuser1.png"}
                    alt="user"
                    className={styles.userImg}
                />
                <h3 className={styles.name}>{workmate?.workMate?.name}</h3>

                <Rating
                initialRating={workmate?.workMate?.rating  || 3.5}
                readonly
                fullSymbol={<span className={styles.filledStar}>★</span>}
                emptySymbol={<span className={styles.star}>★</span>}
                className={styles.rating}
                />

                <p>
                    distance : {Number(workmate.distanceFromUser).toFixed(1)} km
                </p>

                <div className={styles.skillsBox}>
                    <p> skills : </p>
                    <ul className={styles.skillsList}>
                    {workmate?.skills?.map((skill) => (
                        <li key={skill} className={styles.skill}>
                        <p className={styles.skillName}>{skill}</p>
                        </li>
                    ))}
                    </ul>
                </div>

            </div>

            <form className={styles.messageBox} onSubmit={handleSubmit(onSubmit)}>
                <textarea
                    id="message"
                    className={styles.message}
                    placeholder="Send a message..."
                    {...register("message")}
                />
                <button className={styles.sendButton}>SEND</button>
            </form>

    </div>
  );
}
