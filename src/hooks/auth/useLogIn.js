import { useMutation, useQueryClient } from "@tanstack/react-query";
import logIn from "../../services/apis/login";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logIn,
    onSuccess: (res) => {
      // 1. Save the token (the only thing we keep in LocalStorage)
      console.log(res);
      localStorage.removeItem("accessToken");
      localStorage.setItem("accessToken", res?.data?.accessToken || "");
      
      // 2. Optimistically fill the "user" cache with the login response
      // This prevents that "loading" flicker on the first page load
      queryClient.setQueryData(["user"], res.data.data.user);

      // 3. Move to the main app
      navigate("/")
    },
    onError: (err) => {
      alert(err.response?.data?.message || "Invalid credentials");
    }
  });
}