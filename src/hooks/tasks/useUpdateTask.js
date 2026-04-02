import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateTask from "../../services/apis/updateTask";

export default function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    //  { taskId, payload }
    mutationFn: ({ taskId, payload }) => updateTask(taskId, payload),

    onSuccess: ( _, variables) => {
      
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      
      
      console.log(`Task ${variables.taskId} cache refreshed`);
    },

    onError: (err) => {
      const errorMsg = err.response?.data?.message || "Update failed";
      console.error("Mutation Error:", errorMsg);
    }
  });
}