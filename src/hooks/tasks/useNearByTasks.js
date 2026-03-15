import { useQuery } from "@tanstack/react-query";
import geNearByTasks from "../../services/apis/getNearByTasks";

export default function useNearByTasks(location) {
  return useQuery({
    queryKey: ['tasks', location?.[0], location?.[1]], 
    queryFn: async () => {
      const [lng, lat] = location;
      return await geNearByTasks(lng, lat);
    },
    enabled: Array.isArray(location) && location.length === 2,
  });
}