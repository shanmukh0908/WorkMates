import { useMutation, useQueryClient } from "@tanstack/react-query";
import logIn from "../../services/apis/login";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logIn,
    onSuccess: (res) => {
      
      console.log(res);
      localStorage.removeItem("accessToken");
      localStorage.setItem("accessToken", res?.data?.accessToken || "");
      
      // Optimistically fill the "user" cache with the login response
      // This prevents that "loading" flicker when the pages loads for first time
      queryClient.setQueryData(["user"], res.data.data.user);

      navigate("/")
    },
    onError: (err) => {
      alert(err.response?.data?.message || "Invalid credentials");
    }
  });
}