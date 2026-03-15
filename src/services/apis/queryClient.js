
import { QueryClient} from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      gcTime: 1000 * 60 * 60, // 1 hour
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

