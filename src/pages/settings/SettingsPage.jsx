import { Outlet, useNavigate } from "react-router-dom";
import styles from "./SettingsPage.module.css";


export default function SettingsPage() {
const navigate = useNavigate()
  return (
    <div className={styles.settingsContainer}> 

    <div className={styles.settingBox}>
      <button className={styles.setting} onClick={()=>navigate("profile")}>
        <p>Profile Settings</p>
      </button>

      <button className={styles.setting} onClick={()=>navigate("email-password")}>
        <p>Change Email/Password</p>
      </button>

      <button className={styles.setting} onClick={()=>navigate("visibility")}>
        <p>Visibility Settings</p>
      </button>

      <button className={styles.setting} onClick={()=>navigate("notifications")}>
        <p>Notification Settings</p>
      </button>

    </div>

     <div className={styles.settingBox2}>
      <Outlet />
     </div> 

    </div>
  );
}
