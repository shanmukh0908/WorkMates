/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */

import styles from "./YourTasksPage.module.css";
import YourSavedCreatedTasks from "./YourSavedTasks";
import useFilteredTasks from "../../hooks/tasks/useFilteredTasks";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import getUserIdFromToken from "../../services/apis/getUserIdFromToken";


export default function YourTasksPage() {
  
  const navigate = useNavigate();
  const userId = getUserIdFromToken()
  const {workMate,normalUser} = useSelector((store)=>store.userType)

  console.log("inside your tasks")

  const [taskstatus, setTaskStatus] = useState("assigned");

  // // Decode token safely
  // const token = localStorage.getItem("token");

  // let decoded = {};
  // try {
  //   if (token) decoded = jwtDecode(token);
  // } catch (err) {
  //   console.error("Invalid or expired token:", err);
  // }

  // const userId = decoded?.id || decoded?.userId || decoded?._id;

  let status = taskstatus !== "saved" ? taskstatus : "assigned";
 
  const taskfilters = useMemo(() => {
    if (taskstatus !== "created") {
      return {
        or: [
          { acceptedBy: userId },
          { createdBy: userId }
        ],
        status, 
      };
    }
    return {
      createdBy: userId
    };
  }, [userId, status, taskstatus]);

  const { data: filtertaskdata = [], refetch: refetchfiltered, isFetching: isFetchingFiltered } = useFilteredTasks(taskfilters);

  console.log("filtred tasks ",filtertaskdata,taskfilters)

  const createdTasks = useMemo(() => {
  return filtertaskdata?.filter(task => task.createdBy?._id === userId) || [];
}, [filtertaskdata, userId]);


  console.log("createdtasks",createdTasks)

  // Show a message if not authenticated
  if (!userId) {
    return <p>User not authenticated</p>;
  }

  let tasklist = Array.isArray(filtertaskdata) ? filtertaskdata : [];

  if(taskstatus === "created")
{
  Array.isArray(createdTasks) ? createdTasks : [];
}

  if (isFetchingFiltered) {
    return <p>Loading tasks...</p>;
  }

  return (
  <div className={styles.tasksBox}>

    <div className={styles.taskStatusBox}>
      <button
        onClick={() => setTaskStatus("completed")}
        className={taskstatus ==="completed" ? `${styles.finishedtaskButton} ${styles.active1}` : `${styles.finishedtaskButton}`}
      >
        Completed Tasks
      </button>
      <button
        onClick={() => setTaskStatus("assigned")}
        className={taskstatus ==="assigned" ? `${styles.upcomingTasksButton} ${styles.active2}` : `${styles.upcomingTasksButton}`}
      >
        Upcoming Tasks
      </button>


      {workMate ? (<button
        onClick={() => setTaskStatus("saved")}
        className={taskstatus ==="saved" ? `${styles.savedTasksButton} ${styles.active3}` : `${styles.savedTasksButton}`}
      >
        Saved Tasks
      </button>) : (<button
        onClick={() => {setTaskStatus("created")
        refetchfiltered()
        }}
        className={taskstatus ==="created" ? `${styles.savedTasksButton} ${styles.active3}` : `${styles.savedTasksButton}`}
      >
        Created Tasks
      </button>)}
      
    </div>

      { (taskstatus === "assigned" || taskstatus === "completed" || taskstatus === "created" ) ? (

      <ul className={styles.taskList}>
        { tasklist.map((task) => { task.status = taskstatus 
        return (
          <li
            key={task._id}
            className={styles.taskListItem}
            onClick={() => navigate(`/tasks/${task._id}`, { state: { task} })}
          >
            <div className={styles.user}>
              <img
                src={
                  task.createdBy?.profilePhoto
                    ?
                    (task.createdBy.profilePhoto.startsWith("https://res.cloudinary.com")?`${task.createdBy.profilePhoto}`:`http://localhost:3000/public/imagesimagesprofilephotos/${task.createdBy.profilePhoto}`)
                    : "/tmuser1.png"
                }
                alt={task.createdBy?.name || "User"}
                className={styles.userImg}
              />
              <p className={styles.userName}>
                {task?.createdBy?.name || task?.task?.createdBy?.name}
              </p>
            </div>

            <p>{task.distanceFromUser || task?.task?.distanceFromUser} km</p>
            <p>Category: {task.category || task?.task?.category}</p>
          </li>) })}
    </ul>
        )
       : (
        <YourSavedCreatedTasks />
      )
      
      }
  </div>
);

}
