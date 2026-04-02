/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */

import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import { deleteSavedTask } from "../../services/apis/savedTasks";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { convertDistance, getDistance} from "geolib"
import styles from "./YourTasksPage.module.css";

function YourSavedTasks() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [display,setDisplay] = useState(false)
  const savedTasksData = queryClient.getQueryData(["savedtasks"]) || [];
  console.log(savedTasksData,"from your saved tasks >>>>>")

const storedLoc = JSON.parse(localStorage.getItem("userLocation")); // [lng, lat]
const userLocation = { latitude: storedLoc[1], longitude: storedLoc[0] };

const savedtasks = savedTasksData?.map((t) => {
  const [lng, lat] = t.task?.taskLocation.coordinates; // GeoJSON: [lng, lat]
  const taskLoc = { latitude: lat, longitude: lng };

  const distanceInMeters = getDistance(userLocation, taskLoc);
  const distanceInKm = convertDistance(distanceInMeters, "km");

  return {
    ...t.task,
    distanceFromUser: Number(distanceInKm.toFixed(1)),
  };
});

console.log("📍 Saved tasks with distance:", savedtasks);


  async function handleSaveClick(taskId) {
    // Store previous data for rollback
    const previousSavedTasks = queryClient.getQueryData(["savedtasks"]);

    // Optimistic update: remove the deleted task
    queryClient.setQueryData(["savedtasks"], (oldData = []) =>
      oldData.filter((t) => t?.task?._id !== taskId)
    );

    try {
      await deleteSavedTask(taskId);
      setDisplay(prev => !prev)
    } catch (err) {
      console.error("❌ Failed to delete saved task:", err);
      // Rollback on failure
      queryClient.setQueryData(["savedtasks"], previousSavedTasks);
      setDisplay(prev => !prev)
    }
  }

  if (savedtasks.length === 0) {
    return <p className={styles.noTasksText}>No saved tasks yet.</p>;
  }

  return (
    <ul className={styles.taskList}>
      {savedtasks.map((t) => (
        <li
          key={t._id}
          className={styles.taskListItem}
          onClick={() => navigate(`/tasks/${t._id}`, { state: { task: t } })}
        >
          <div className={styles.user}>
            <img
              src={
                t.createdBy?.profilePhoto
                  ?
                  (t.createdBy.profilePhoto.startsWith("https://res.cloudinary.com")?`${t.createdBy.profilePhoto}`:`http://localhost:3000/public/profilephotos/${t.createdBy.profilePhoto}`)
                  : "/tmuser1.png"
              }
              alt={t.createdBy?.name || "User"}
              className={styles.userImg}
            />
            <p className={styles.userName}>{t.createdBy?.name}</p>
          </div>

          <p>{t.distanceFromUser} km</p>
          <p>Category: {t.category}</p>

          <DocumentPlusIcon
            className={`${styles.SaveIcon} ${styles.saved}`}
            onClick={(e) => {
              e.stopPropagation();
              handleSaveClick(t._id);
            }}
          />
        </li>
      ))}
    </ul>
  );
}

export default React.memo(YourSavedTasks);
