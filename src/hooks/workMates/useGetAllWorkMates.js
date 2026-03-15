import { useQuery } from "@tanstack/react-query";
import getAllWorkMates from "../../services/apis/getAllWorkMates"

export default function useGetAllWorkMates(location,filters) {
  return useQuery({
    queryKey: ['workmates', location?.[0], location?.[1],{ ...filters }], 
    queryFn: async () => {
      console.log(filters)
      const data = {location:location,distance:100000,...filters}
      console.log(data)
      return await getAllWorkMates(data);
    },
    enabled: true,
  });
}