import { useMutation, useQueryClient } from "@tanstack/react-query";
import createNotification from "../../services/apis/createNotification";

export default function useSendNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    // Our service function takes two arguments, so we wrap them in an object
    mutationFn: ({ message, toId }) => createNotification(message, toId),

    onSuccess: () => {
      // If you have a notification list (bell icon), refresh it!
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      console.log("Notification cache updated");
    },
    
    onError: (err) => {
      // Silently log notification errors or show a small toast
      console.error("Notification failed to send:", err.message);
    },
  });
}