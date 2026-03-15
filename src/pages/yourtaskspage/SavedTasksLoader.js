// savedTasksLoader.js
import { getSavedTasks } from "../../services/apis/savedTasks";
import { queryClient } from "../../services/apis/queryClient"

export async function savedTasksLoader() {
  // 👇 no hook here — queryClient comes from argument
  await queryClient.ensureQueryData({
    queryKey: ["savedtasks"],
    queryFn: getSavedTasks,
  });

  return null;
}