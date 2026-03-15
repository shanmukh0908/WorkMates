
import api from "./axios";

export default async function logout(){
    await api.post("/users/logout");
    localStorage.removeItem("accessToken"); 
}