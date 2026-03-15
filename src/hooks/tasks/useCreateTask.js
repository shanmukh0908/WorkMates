import { useMutation, useQueryClient } from "@tanstack/react-query";
import createTask from "../../services/apis/createTask" // Your existing service
import { useNavigate } from "react-router-dom";

export default function useCreateTask() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    // 1. The service function we are wrapping
    mutationFn: ({ taskData, files }) => createTask(taskData, files),

    // 2. What happens after the server confirms success
    onSuccess: (response) => {
      console.log("Task created successfully in TanStack Query",response);
      
      // Refresh the task list so the user sees the new task immediately
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      
      // Handle navigation here instead of inside the service
      navigate("/tasks"); 
    },

    // 3. Centralized error handling
    onError: (error) => {
      const message = error.response?.data?.message || "Failed to create task";
      alert(message); // Replace with your Toast notification later
    },
  });
}