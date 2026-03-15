/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
import styles from "./messagePage.module.css";
import { XMarkIcon } from "@heroicons/react/24/outline";
import useGetAllMessages from "../../hooks/messages/useGetAllMessages";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import updateTask from "../../services/apis/updateTask";
import updateMessage from "../../services/apis/updateMessage";
import postMessage from "../../services/apis/postMessage"
import { useForm } from "react-hook-form";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { queryClient } from "../../services/apis/queryClient";
import getUserIdFromToken from "../../services/apis/getUserIdFromToken";

export default function MessagePage() {
  const loc = useLocation();
  const navigate = useNavigate()
  const userId = getUserIdFromToken()
  const message = loc.state;
  console.log("inside message page",message)
  const isTaskRequest = message?.messageType === "task_request";
  const {register,reset, handleSubmit} = useForm()
  const { displaysidebar, setDisplaysidebar } = useOutletContext();

  const { data: messagesData, refetch, isLoading } = useGetAllMessages({
    from: message?.from?._id,
    to: message?.to?._id,
  });

  const messages = messagesData?.data ?? [];

  async function handleAcceptButtonClick(taskId,acceptedBy){
    const updateData = {
      acceptedBy,
      status:'assigned'
    }
    const res = await updateTask(taskId,updateData)
    const res2 = await updateMessage(message._id,{taskStatus:"assigned",readStatus:true})
    await refetch()
    console.log("successfully updated signal from messagepage",res,res2)
    queryClient.invalidateQueries(["tasks"])
    navigate("/") 
  }

  async function onSubmit(formData) {

    console.log("message from",message.from.name)
    console.log("message to",message.to.name)
    const payload = {
      to:message.from,
      message: formData.sendingText,
    }

    await postMessage(payload);
    console.log("✅ Message sent:", payload);
    reset();
    refetch();
  }

  return (
    <div className={`${styles.messagebox} ${displaysidebar ? styles.hideMessage : ""}`}>
     <button
        className={styles.closeButton}
        onClick={() => setDisplaysidebar(prev => !prev)}
      >
      <XMarkIcon className={styles.Xmark}/>
      </button>
      {isTaskRequest ? (
        <div className={styles.taskRequestMessageBox} >
          <p className={styles.messageText}>{message.message}</p>
          {
            message?.taskStatus === "assigned" ? <p className={styles.TaskAssignedAlready}> task assigned already </p> :
            <button className={styles.AcceptButton} onClick={()=>handleAcceptButtonClick( message?.task,message?.from?._id)}>Accept</button>
          }
        </div>
      ) : (
        <>
        <ul className={styles.chatBox}>
          {isLoading ? (
            <p>Loading messages...</p>
          ) : (
            messages.map((msg) => (
              <li key={msg._id} className={styles.messageRow} >
                <p className={ userId === msg.from?._id ? `${styles.messageText} ${styles.sent}`
              : styles.messageText
              } 
>                {msg.message}
                </p>
              </li>
            ))
          )}
        </ul>  
        <form className={styles.chatInputBox} onSubmit={handleSubmit(onSubmit)}>
        <input type="text" className={styles.sendingText} autoFocus id="sendingText" {...register("sendingText" )}/>
        <button type="submit">
        <PaperAirplaneIcon  className={styles.sendIcon}/>
        </button>
        </form>
        </>
      )}
      
    </div>
  );
}
