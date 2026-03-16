// savedTasksLoader.js
import { getSavedTasks } from "../../services/apis/savedTasks";
import { queryClient } from "../../services/apis/queryClient";
import getUserIdFromToken from "../../services/apis/getUserIdFromToken";

export async function savedTasksLoader() {
  const uid = getUserIdFromToken()
  console.log("uid from loader" ,uid)
  const tasks = await queryClient.ensureQueryData({
    queryKey: ["savedtasks"],
    queryFn: getSavedTasks,
  });

  return tasks;
}