import { useQuery } from "@tanstack/react-query";
import getAllMessages from "../../services/apis/getAllMessages";

export default function useGetAllMessages(data = {}) {
  
  const params = {
    from: data?.from,
    to: data?.to,
  };

  return useQuery({
    queryKey: ['messages', params], 
    queryFn: () => getAllMessages(params),
    enabled: true 
  });
}

 