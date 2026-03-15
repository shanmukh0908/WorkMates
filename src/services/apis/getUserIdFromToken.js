import { jwtDecode } from "jwt-decode";

export default function getUserIdFromToken()
{
const token = localStorage.getItem("accessToken");
  
    let decoded = {};
    try {
      if (token) decoded = jwtDecode(token);
    } catch (err) {
      console.error("Invalid or expired token:", err);
    }
  
    const userId = decoded?.id || decoded?.userId || decoded?._id;
return userId
}