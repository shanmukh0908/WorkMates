import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSavedTask, deleteSavedTask } from "../../services/apis/savedTasks";

export function useToggleSave() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ task, isSaved }) =>
      isSaved ? deleteSavedTask(task._id) : createSavedTask(task._id),

    onMutate: async ({ task, isSaved }) => {
      await queryClient.cancelQueries(["savedtasks"]);
      const previousData = queryClient.getQueryData(["savedtasks"]);

      queryClient.setQueryData(["savedtasks"], (old = []) => {
        if (isSaved) return old.filter((t) => t.task._id !== task._id);
        return [...old, { task }];
      });

      return { previousData };
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(["savedtasks"], context.previousData);
    },

    onSettled: () => {
      queryClient.invalidateQueries(["savedtasks"]);
    },
  });
}