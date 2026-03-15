
import { queryClient } from "../../services/apis/queryClient";
import CreateWorkMateFormPage from "../workmatespage/createWorkMateFormPage";
import styles from "./HomePage.module.css";

export default function HomePageForWorkMate({ children }) {
  const userdata = queryClient.getQueryData(["user"]) || {}
  console.log("user",userdata) 
  return (
    userdata.skills.length === 0 ? (<CreateWorkMateFormPage />) :
    
    (<div className={styles.searchTasksBox}>

      <div className={styles.imageBox}>
        <img src="/webp/tm30dec1.webp" alt="" />
        <img src="/webp/tm30dec2.webp" alt="" />
        <img src="/webp/tm30dec3.webp" alt="" />
        <img src="/webp/tm30dec4.webp" alt="" />
      </div>

      <div className={styles.CtaSection}>

        <div className={styles.CtaTextBox}>
            <p>Use your skills — every skill has value</p>
            <p>Find tasks that truly need you</p>
            <p>Filter by skill, distance, and ratings</p>
        </div>
        <div className={styles.CtaBox}>
            {children}
        </div>

      </div>

    </div>)
  );
}
