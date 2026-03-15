import { useQuery } from '@tanstack/react-query';
import getAllTasks from '../../services/apis/getAllTasks'

export default function useTasks(filters={}){

// const hasFilters = filters && Object.keys(filters).length > 0;    
console.log(filters)

return useQuery({
    queryKey:['tasks',filters],
    queryFn: async () => {
        console.log("fetching")
        const res = await getAllTasks(filters)
        return res.data
    },
    // enabled:true
})
}