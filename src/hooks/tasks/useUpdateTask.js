import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateTask from "../../services/apis/updateTask";

export default function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    // Variables will be passed as { taskId, payload }
    mutationFn: ({ taskId, payload }) => updateTask(taskId, payload),

    onSuccess: ( _, variables) => {
      // 1. Invalidate the general tasks list
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      
      // 2. Invalidate the specific task detail (if you use useQuery for it)
    //   queryClient.invalidateQueries({ queryKey: ["task", variables.taskId] });
      
      console.log(`Task ${variables.taskId} cache refreshed`);
    },

    onError: (err) => {
      const errorMsg = err.response?.data?.message || "Update failed";
      console.error("Mutation Error:", errorMsg);
    }
  });
}