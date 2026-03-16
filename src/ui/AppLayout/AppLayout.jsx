/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */

import styled from "styled-components";
import Header from "../Header/Header";
import { Link, Outlet } from "react-router-dom";
import getUserIdFromToken from "../../services/apis/getUserIdFromToken";
import { useEffect, useState } from "react";
import getUserDetails from "../../services/apis/getUserDetails";
import { queryClient } from "../../services/apis/queryClient";
import { getCurrentLocation } from "../../services/apis/GeoLocationApi";


const StyledAppLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
`;

const StyledLogInDiv = styled.div`
  align-self: center;
  justify-self: center;
  display: flex;
  flex-direction: column;
  margin-top: 20rem;
`

const LoginLink = styled(Link)`
  align-self: center;
  justify-self: center;
  margin-top: 1rem;
  padding: 0.7rem 1.4rem;
  background: #4f46e5;       /* indigo */
  color: #ffffff;
  text-decoration: none;
  font-weight: 600;
  font-size: 4rem;
  border-radius: 6px;
  transition: all 0.25s ease;

  &:hover {
    background: #4338ca;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;


function AppLayout(){
const userdata = queryClient.getQueryData(["user"]) || {}
console.log(userdata)
const user = {...userdata}
console.log(user._id)
const accessToken = localStorage.getItem("accessToken");

useEffect(() => {
  if (!accessToken) return;

  const fetchUser = async () => {
    try {
      const res = await getUserDetails(); 
      queryClient.setQueryData(["user"],res)
      console.log(res)
      const { lat, lng } = await getCurrentLocation();
      localStorage.setItem("userLocation", JSON.stringify([lng, lat]));
    } catch (err) {
      console.log("either Failed to fetch user or location", err);
    }
  };

  fetchUser();
}, [accessToken]);

    let currentUser = getUserIdFromToken()
    console.log(currentUser,user?._id)
    let isLoggedIn = user?._id?.toString() === currentUser?.toString()
    console.log(isLoggedIn) 

    if(!accessToken){
        return <StyledLogInDiv>
            <h2>you are not logged in... please log in</h2>
            <LoginLink to ="/login"> log in </LoginLink>
        </StyledLogInDiv>
    }

    return <StyledAppLayout>
        {isLoggedIn ? (
        <>
        <Header />
        <Outlet />
        </>
        ) : <LoginLink to ="/login"> log in </LoginLink>}
    </StyledAppLayout>
}

export default AppLayout