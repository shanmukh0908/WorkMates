// savedTasksLoader.js
import { getSavedTasks } from "../../services/apis/savedTasks";
import { queryClient } from "../../services/apis/queryClient"

export async function savedTasksLoader() {
 
  await queryClient.ensureQueryData({
    queryKey: ["savedtasks"],
    queryFn: getSavedTasks,
  });

  return null;
}