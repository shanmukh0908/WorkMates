import { useMutation, useQueryClient } from "@tanstack/react-query";
import postMessage from "../../services/apis/postMessage";

export default function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    // Variables will be passed as { taskId, payload }
    mutationFn: (payload) => postMessage(payload),

    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["messages",variables.taskId] });
      alert("task request successful")
    },

    onError: (err) => {
      const errorMsg = err.response?.data?.message || "Update failed";
      console.error("Mutation Error:", errorMsg);
    }
  });
}