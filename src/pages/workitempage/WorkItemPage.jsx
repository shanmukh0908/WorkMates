/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */

import styles from "./WorkItemPage.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import getUserIdFromToken from "../../services/apis/getUserIdFromToken";
import { useForm } from "react-hook-form";
import usePostMessage from "../../hooks/messages/usePostMesaage";
import useUpdateTask from "../../hooks/tasks/useUpdateTask";
import RatingInput from "../../ui/Ratings/RatingInput";
import SavedTasks from "../tasks/SavedTasks";
import useSendNotification from "../../hooks/notifications/useSendNotification";

export default function WorkItemPage() {
  const user = getUserIdFromToken()
  const { mutate: sendNotification,isPending:sendingNotification,isError:nofticationError } = useSendNotification()
  const {mutate: sendMessage,isPending:sendingMessage,isError:messagingError } = usePostMessage()
  const {mutate: updateTask,isPending:updatingTask,isError:taskUpdationError } = useUpdateTask()
  console.log(user,"user")
  const location = useLocation()
  const navigate = useNavigate()

  let {task} = location.state
  
  console.log(task)
  const profilePhoto = task?.createdBy?.profilePhoto
  console.log(profilePhoto)
  let ratedTo = null;

if (user.toString() === task?.acceptedBy?.toString()) {
  // Worker is rating the creator
  console.log("signal")
  ratedTo = task?.createdBy?._id;
}

if (user.toString() === task?.createdBy?._id?.toString()) {
  // Creator is rating the worker
  console.log("signal")
  ratedTo = task?.acceptedBy;
}
  

const { register, handleSubmit, reset } = useForm();


async function onSubmit(formData) {
    console.log(formData,"formdata ********")
      const payload = {
        to: task?.createdBy._id,
        message: formData.message,
        messageType:"task_request",
        task:task?._id
        // offerPrice: formData.offerPrice,
      };

      sendMessage(payload,{
        onSuccess:()=>{
          sendNotification({ 
            message: "Someone is interested in your task!", 
            toId: task?.createdBy?._id 
            });
          reset(); 
        }
      })
   
  }

  function handleCompletedClick() {
  const userId = getUserIdFromToken();
  let payload;
  let toId;

  if (userId === task?.createdBy?._id) {
    payload = { markedAsCompleteByCreatedBy: true };
    toId = task?.acceptedBy;
  }
   
  if(userId === task?.acceptedBy) {
    payload = { markedAsCompleteByAcceptedBy: true };
    toId = task?.createdBy?._id;
  }

  // Perform the first update
  updateTask({ taskId: task._id, payload }, {
    onSuccess: () => {
      // This only runs after the database successfully updates
      sendNotification({
        message: "Your task has been marked as completed from the other end...",
        toId,
      });

      // Check for final completion
      // We check our CURRENT payload + the existing task state
      const isNowComplete = 
        (payload.markedAsCompleteByCreatedBy && task?.markedAsCompleteByAcceptedBy) || 
        (payload.markedAsCompleteByAcceptedBy && task?.markedAsCompleteByCreatedBy);

      if (isNowComplete) {
        // Final status update
        updateTask({ taskId: task._id, payload: { status: "completed" } }, {
          onSuccess: () => {
            const msg = "Task completed. Please give your rating.";
            sendNotification({ message: msg, toId: task?.acceptedBy });
            sendNotification({ message: msg, toId: task?.createdBy?._id });
            navigate("/yourtasks");
          }
        });
      }
    }
  });
}



  return (
    <div className={styles.taskBox}>
      <div className={styles.descriptionBox}>
        <div className={styles.user}>
          
         {profilePhoto != "" ?
         <img 
          src={profilePhoto?.startsWith("https://res.cloudinary.com") ? `${task?.createdBy?.profilePhoto}`:`http://localhost:3000/public/profilephotos/${task?.createdBy?.profilePhoto}`} 
          alt="user1" 
          className={styles.userImg} 
        />
        :
        <img src= "/tmuser1.png"alt="user" className={styles.userImg}  />
      }
          <div className={styles.userDetails}>
            <p className={styles.userName}>
              <b>name :</b><span>{task?.createdBy?.name}</span>
            </p>
            <p>
              <b>location :</b><span>{task.distanceFromUser} Km from your location</span>
            </p>
          </div>
          <SavedTasks styles ={styles}  task = {task} />
        </div>

        <p className={styles.category}>
          <b>category : </b><span>gardening</span>
        </p>

        <p className={styles.description}>
          <b>description of the task : </b>
         <span >{task.taskDescription}</span>
        </p>


      </div>

      

      <div className={styles.taskImages}>

        {task.taskImages.map((img, index) => (
        <div key={index} className={styles.imageBox}>
            {img.startsWith("https://res.cloudinary.com") ? (
              <img 
                src={img} 
                alt={`Task ${index}`} 
              />
            ) : (
              <img 
                src={`http://localhost:3000/public/images/${img}`} 
                alt={`Task ${index}`} 
              />
            )}
        </div>
        ))}

      </div>

      <div className={styles.priceBox}>
        <p className={styles.amount}>amount : {task.amountOffered} </p>
        <label>
          Amount Negotiable?{" "}
          <input
          type="checkbox"
          name="priceNegotiable"
          className={styles.amountNegotiable}
          checked={task.negotiable}
          disabled
        />
        </label>
      </div>

      <div className={styles.buttonBox}>
        <button className={`${styles.save} ${styles.button}`}>
          save the task
        </button>
        <button className={`${styles.interseted} ${styles.button}`}>
          I am interested
        </button>
      </div>
      
      {
        (task.status != "assigned" && task.status !="completed") &&
      
      <form className={styles.messageBox} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="offerPrice">Your Offer Price</label>
          <input
            type="text"
            id="offerPrice"
            className={styles.yourOfferPrice}
            {...register("offerPrice")}
          />
        </div>
        <div className={styles.yourMessage}>
          <label htmlFor="message">Any message from your end</label>
          <textarea
            id="message"
            className={styles.message}
            {...register("message")}
          ></textarea>
        </div>

        <button type="submit" className={styles.submitRequestButton} disabled={sendingMessage}>
          {sendingMessage ? "sending..." : "SUBMIT"}
        </button>
      </form> 
      } 
      
     { task.status === "assigned" && (
      <button 
        onClick={handleCompletedClick} 
        className={styles.markAsCompleteButton}
        disabled={updatingTask}
      > 
        {updatingTask ? "UPDATING..." : "mark as completed"} 
      </button>
    )}
      
      {task.status === "completed" && <RatingInput ratedTo = {ratedTo} taskId={task?._id}/>}
      

    </div>
  );
}
