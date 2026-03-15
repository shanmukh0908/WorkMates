import { useState } from "react";
import Rating from "react-rating";
import styles from "./RatingInputStyles.module.css";
import usePostRating from "../../hooks/ratings/usePostRating";

export default function RatingInput({ ratedTo, taskId }) {
  const [rating, setRating] = useState(0);
  const {mutate:postRating,isPending} = usePostRating()
  function handleSubmit() {
      const payload = {
        rating,
        ratedTo,
        task: taskId,
      };
      console.log(payload)
      postRating(payload);   
  }

  return (
    <div className={styles.container}>
      <Rating
        initialRating={rating}
        onChange={(value) => setRating(value)}
        fullSymbol={<span className={styles.fullStar}>★</span>}
        emptySymbol={<span className={styles.emptyStar}>★</span>}
      />

      <p className={styles.text}>Rating: {rating}</p>

      <button 
        className={styles.submitRatingButton} 
        onClick={handleSubmit}
        disabled={isPending} // Prevent double-submit or empty ratings
      >
        {isPending ? "Posting..." : "SUBMIT RATING"}
      </button>
    </div>
  );
}
