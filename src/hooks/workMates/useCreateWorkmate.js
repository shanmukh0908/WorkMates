import { useMutation, useQueryClient } from "@tanstack/react-query";
import createWorkMate from "../../services/apis/createWorkMate";
import { useNavigate } from "react-router-dom";
// import updateUserProfile from "../../services/apis/updateUserProfile";
export default function useCreateWorkMate() {
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  return useMutation({
    // Our service function
    mutationFn: (workMateData) => createWorkMate(workMateData),

    onSuccess: async (data, variables) => {
    try {
      // 1. Update the database and get the ACTUAL new user object back
      // const updatedUserResponse = await updateUserProfile({skills:variables.skills});
      // const freshUser = updatedUserResponse.data; // Adjust based on your API response structure
      // console.log(updatedUserResponse,"user details **********")
      // 2. Refresh the list of workmates
      queryClient.invalidateQueries({ queryKey: ["workmates"] });

      // 3. Update the user cache with the SERVER'S data, not the local variables
      queryClient.setQueryData(["user"], (oldData) => {
        if (!oldData) return ;
        return {
          ...oldData,
          skills:variables.skills // This is safer than just manually setting skills
        };
      });

      navigate('/workmates');
    } catch (error) {
      console.error("Failed to sync user skills after creating WorkMate", error);
      // You might want to show a toast here
    }
  },
    onError: (err) => {
      // Handle the error specifically for this action
      const errorMsg = err.response?.data?.message || "Failed to add WorkMate";
      console.error(errorMsg);
    },
  });
}