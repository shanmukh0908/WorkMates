import api from "./axios";

const getUserDetails = async (params ={})=> {
    try{
        console.log(params)
        let res = await api.get('/users/details')
            console.log("✅ user details fetched successfully",res.data.data.user);
            return res.data.data.user;
        
    }
    catch(err){
    console.error("❌ Could not fetch user details:", err.response?.data || err.message);
    throw err;
    }
}

export default getUserDetails