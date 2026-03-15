import api from "./axios";

export default async function geNearByTasks(lng,lat){
    try{

        const res = await api.get(`/tasks/within/${10000000}/center/${lng},${lat}`)
        console.log('successfully fetched tasks')
        return res.data
    }catch (err) {
    console.error("❌ Could not fetch tasks:", err.response?.data || err.message);
    throw err;
  }
}