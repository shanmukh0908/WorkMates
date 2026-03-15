/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */

import { Outlet, useNavigate } from "react-router-dom"; // ✅ Import Outlet here
import useGetAllMessages from "../../hooks/messages/useGetAllMessages";
import styles from "./AllMessagesPage.module.css";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function AllMessagesPage() {
  const { data: messagesdata = {}, isLoading } = useGetAllMessages();
  const navigate = useNavigate();
  const [displaysidebar,setDisplaysidebar] = useState(true)

  if (isLoading) return <p>Loading...</p>;

  const messages = messagesdata.data || [];

  function handleClickOnMessage(message) {
    navigate(`/messages/${message._id}`, { state: message });
    console.log("message from " ,message.from.name)
  }

  return (
    <div className={styles.messagesLayout}>
      {/* <button
        className={styles.closeButton}
        onClick={() => setDisplaysidebar(prev => !prev)}
      >
      <XMarkIcon className={styles.Xmark}/>
      </button> */}
      {/* Left Sidebar (Messages List) */}
      <aside className={`${styles.sidebar} ${ displaysidebar ? styles.occupyFullViewSidebar : styles.hideSideBar}`}>
        <ul className={styles.messageList}>
          {messages.map((message) => (
            <li
                key={message._id}
                className={styles.messageItem}
                onClick={() => {handleClickOnMessage(message)
                                setDisplaysidebar(prev => !prev)}}
              >
                <p className={styles.messageFrom}>
                  {message.from?.name ?? "Unknown"}
                </p>

                <p className={styles.messagePreview}>
                  {message.message ? `${message.message.slice(0, 20)}...` : "No message"}
                </p>

                {message.messageType === "task_request" && (
                  <p className={styles.messageType}>Task request</p>
                )}
            </li>
          ))}
        </ul>
      </aside>

      {/* Right Side (Conversation) */}
      <main className={styles.main}>
        <Outlet context={{ displaysidebar, setDisplaysidebar }}/> {/* ✅ This will render <MessagePage /> when route matches /messages/:id */}
      </main>
    </div>
  );
}

