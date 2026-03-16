/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */

import styles from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
import { getCurrentLocation } from "../../services/apis/GeoLocationApi";
import { useSelector } from "react-redux";
// import { setLocation } from "../../features/tasks/tasksSlice";
// import { useLoaderData } from "react-router-dom";
import HomePageForNormalUser,{HomePageForNormalUser2} from "./HomePageForNormalUser";
import HomePageForWorkMate from "./HompageForWorkMate";


export default function HomePage() {

  const navigate = useNavigate();
  const {workMate,normalUser} = useSelector((store)=>store.userType)

function handleClick() { 
    navigate("/tasks");
}

async function handleClick2() {
    navigate("/workmates");
}

return (
    <div className={styles.taskContainer}>
      {workMate && (
        <HomePageForWorkMate>
          <button className={styles.nearbyTasksButton} onClick={()=>handleClick()}>search near by tasks</button>
        </HomePageForWorkMate>
      )}
      {normalUser && (
        <>

        <HomePageForNormalUser>
        <button className={styles.nearbyWorkMatesButton} onClick={()=>handleClick2()}>search near by work mates</button>
        </HomePageForNormalUser>

        <HomePageForNormalUser2>
        <button className={styles.nearbyWorkMatesButton} onClick={()=>navigate("/createtask")}>Post your task </button>
        </HomePageForNormalUser2>

        </>
        )}
    </div>
  );
}