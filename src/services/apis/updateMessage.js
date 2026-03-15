import api from './axios'

const updateMessage = async (messageid,data={})=>{
try{
    const res = await api.patch(`/messages/${messageid}`,data)
    console.log("message update successful")
    return res?.data
}
catch(err){
    console.error("❌ Could not update the message:", err.response?.data || err.message);
    throw err;
}
}

export default updateMessage