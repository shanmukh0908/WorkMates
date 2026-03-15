import { useQuery } from "@tanstack/react-query";
import getAllNotifications from "../../services/apis/getAllNotifications";

export default function useGetNotifications() {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: getAllNotifications,
    enabled: true,
  });
}