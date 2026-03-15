import { queryClient } from "../../services/apis/queryClient"
import getUserDetails from '../../services/apis/getUserDetails';

export async function HomePageLoader(){
    try{

        const user = await queryClient.ensureQueryData({
            queryKey: ["user"],
            queryFn: getUserDetails,
          });
        console.log("user details fetched successfully",user)
        return user
    }
    catch(err){
        console.log("user details could not be fetched",err)
    }
}