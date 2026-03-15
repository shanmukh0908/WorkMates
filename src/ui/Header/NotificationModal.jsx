import useGetNotifications from "../../hooks/notifications/useGetNotifications"
import styles from "./NotificationModal.module.css"

export default function NotificationModal(){

    const { data: notifications = [], isLoading } = useGetNotifications();

return (
  <div className={styles.notificationBox}>
    {isLoading ? (<p> loading ...</p> ):(<ul className={styles.notificationslist}>
      {notifications?.data?.map(n => (
        <li key={n._id} className={styles.notificationlistitem}>
          <button className={styles.notificationitembutton}>
            <p>{n.message}</p>
          </button>
        </li>
      ))}
    </ul>) }
    
  </div>
);
}