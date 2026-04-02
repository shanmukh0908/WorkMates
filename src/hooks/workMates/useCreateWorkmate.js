import { useMutation, useQueryClient } from "@tanstack/react-query";
import createWorkMate from "../../services/apis/createWorkMate";
import { useNavigate } from "react-router-dom";

export default function useCreateWorkMate() {
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  return useMutation({
    
    mutationFn: (workMateData) => createWorkMate(workMateData),

    onSuccess: async (data, variables) => {
    try {
      
      //  Refresh the list of workmates
      queryClient.invalidateQueries({ queryKey: ["workmates"] });

      queryClient.setQueryData(["user"], (oldData) => {
        if (!oldData) return ;
        return {
          ...oldData,
          skills:variables.skills
        };
      });

      navigate('/workmates');
    } catch (error) {
      console.error("Failed to sync user skills after creating WorkMate", error);
      
    }
  },
    onError: (err) => {
      
      const errorMsg = err.response?.data?.message || "Failed to add WorkMate";
      console.error(errorMsg);
    },
  });
}