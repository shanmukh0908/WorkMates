import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "../../services/apis/updateUserProfile";
;

export function useUpdateUserProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserProfile,

    // 🔥 Optimistic update
    onMutate: async (newData) => {
      await queryClient.cancelQueries(["user"]);

      const previousUser = queryClient.getQueryData(["user"]);

      queryClient.setQueryData(["user"], (oldData) => ({
        ...oldData,
        ...newData, // instantly reflect changes
      }));

      return { previousUser };
    },

    // ❌ Rollback if error
    onError: (err, newData, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(["user"], context.previousUser);
      }
    },

    // ✅ Sync with real backend response
    onSuccess: (serverData) => {
      queryClient.setQueryData(["user"], (oldData) => ({
        ...oldData,
        ...serverData,
      }));
    },
  });
}