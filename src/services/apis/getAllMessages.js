import api from "./axios"

const getAllMessages = async (params ={})=> {
    try{
        console.log(params)
        let res = await api.get('/messages',{params})
            console.log("✅ All messages fetched successfully");
            console.log(res?.data)
            return res.data;
        
    }
    catch(err){
    console.error("❌ Could not fetch messages:", err.response?.data || err.message);
    throw err;
    }
}

export default getAllMessages