import { useQuery } from '@tanstack/react-query';
import { getSavedTasks } from '../../services/apis/savedTasks';

export default function useGetSavedTasks(){
   return useQuery({
    queryKey:['savedtasks'],
    queryFn:async ()=>{
        console.log("fetching saved tasks")
        return await getSavedTasks()
    },
    enabled:true
   })
}