// import { createPortal } from "react-dom"
import { useNavigate } from "react-router-dom"
import styles from "./UserModal.module.css"
import { queryClient } from "../../services/apis/queryClient"
import logout from "../../services/apis/logout"
import { useDispatch } from "react-redux";
import {showNoModel} from "../../features/header/headerslice";
// import { useState } from "react";

export default function UserModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [reload,setReload] = useState(false)
  const queryData = queryClient.getQueryData(["user"]);
  const user = queryData // ✅ real user object

  console.log(user,"from show modal")

  async function handleLogout() {
    await logout();
    queryClient.clear();
    navigate("/login");
    dispatch(showNoModel());
  }

  return (
    <div className={styles.userBox}>
      <img
        src={
          user?.profilePhoto
          ?
          (user?.profilePhoto?.startsWith("https://res.cloudinary.com")?`${user.profilePhoto}`:`http://localhost:3000/public/profilephotos/${user.profilePhoto}`)
          : "/tmuser1.png"
        }
        alt="user"
        className={styles.userImg}
      />

      <p>Hi {user?.name}</p>

      <button
        className={styles.yourTasks}
        onClick={() => {
          navigate("/yourtasks");
          dispatch(showNoModel());
        }}
      >
        your tasks
      </button>

      <button
        className={styles.yourMessages}
        onClick={() => {
          navigate("/messages");
          dispatch(showNoModel());
        }}
      >
        your messages
      </button>

      <button className={styles.logoutButton} onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
}
