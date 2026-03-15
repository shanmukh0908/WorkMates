import { useQuery } from "@tanstack/react-query";
import getUserDetails from "../../services/apis/getAllWorkMates"

export default function useGetUserDetails() {
  return useQuery({
    queryKey: ['user'], 
    queryFn: async () => {
      return await getUserDetails()
    },
    enabled: true,
  });
}