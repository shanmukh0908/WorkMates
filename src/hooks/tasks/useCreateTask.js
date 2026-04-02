import { useMutation, useQueryClient } from "@tanstack/react-query";
import createTask from "../../services/apis/createTask" // Your existing service
import { useNavigate } from "react-router-dom";

export default function useCreateTask() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    
    mutationFn: ({ taskData, files }) => createTask(taskData, files),

    
    onSuccess: (response) => {
      console.log("Task created successfully in TanStack Query",response);
      
      
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      
     
      navigate("/tasks"); 
    },

    
    onError: (error) => {
      const message = error.response?.data?.message || "Failed to create task";
      alert(message);
    },
  });
}