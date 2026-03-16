// savedTasksLoader.js
import { getSavedTasks } from "../../services/apis/savedTasks";
import { queryClient } from "../../services/apis/queryClient";
import getUserIdFromToken from "../../services/apis/getUserIdFromToken";
import { getCurrentLocation } from "../../services/apis/GeoLocationApi";

export async function savedTasksLoader() {
  const uid = getUserIdFromToken()
  console.log("uid from loader" ,uid)
  const tasks = await queryClient.ensureQueryData({
    queryKey: ["savedtasks"],
    queryFn: getSavedTasks,
  });
  try {
    const existingLocation = localStorage.getItem("userLocation");
    if (!existingLocation) {
      const { lat, lng } = await getCurrentLocation();
      localStorage.setItem("userLocation", JSON.stringify([lng, lat]));
    }
  } catch (error) {
    console.log("no lacation available and unable to fetch",error)
  }
  
  return tasks;
}