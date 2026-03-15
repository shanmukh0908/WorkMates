// savedTasksLoader.js
import { getSavedTasks } from "../../services/apis/savedTasks";
import { queryClient } from "../../services/apis/queryClient";
import getUserIdFromToken from "../../services/apis/getUserIdFromToken";

export async function savedTasksLoader() {
  const uid = getUserIdFromToken()
  // 👇 no hook here — queryClient comes from argument
  const tasks = await queryClient.ensureQueryData({
    queryKey: ["savedtasks",uid],
    queryFn: getSavedTasks,
  });

  return tasks;
}