/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */

import { useNavigate } from "react-router-dom";
import useGetAllMessages from "../../hooks/messages/useGetAllMessages";
import styles from "./AllMessagesPage.module.css";

export default function AllMessagesPage() {
  const { data: messagesdata = [], isLoading, refetch } = useGetAllMessages();
  console.log(messagesdata.data)
  const navigate = useNavigate();
  console.log("inside all messages page")

  function handleClickOnMessage(message) {
    navigate("/messages/123", { state: message });
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className={styles.messagesBox}>
      <ul className={styles.messageListBox}>
        {messagesdata?.data?.map((message) => (
          <li
            key={message._id} 
            className={styles.singleMessage}
            onClick={() => handleClickOnMessage(message)} 
          >
            <p className={styles.from}>{message.from?.name || "Unknown"}</p>
            <p className={styles.messageText}>
              {message.message?.slice(0, 20)}...
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
