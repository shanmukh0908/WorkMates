import { useMutation, useQueryClient } from "@tanstack/react-query";
import postRating from "../../services/apis/postRating";
import { useNavigate } from "react-router-dom";

export default function usePostRating() {
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  return useMutation({
    mutationFn: postRating,
    
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["users", variables.ratedTo], (user) => {
        if (!user) return null;
        return { ...user, rating:variables.rating };
      });
      alert("thanks for the rating");
      navigate("/")
    },
    
    onError: (err) => {
      alert("Could not save rating. Please try again.",err);
    }
  });
}