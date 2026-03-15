/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */

import styled from "styled-components";
import { UserIcon, BellIcon, Cog8ToothIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleshowUserModal,
  toggleshowNotificationModel,
  showNoModel,
} from "../../features/header/headerslice";
import { setWorkMate, setNormalUser } from "../../features/userType/userTypeSlice";
import UserModal from "./userModal";
import NotificationModal from "./NotificationModal";
import { queryClient } from "../../services/apis/queryClient";

/* =======================
   BRAND COLORS
   =======================
   Text / Structure:  #0C1D36
   Primary Accent:    #4F46E5
   Hover Accent:      #6366F1
   Soft Accent BG:    rgba(79,70,229,0.15)
*/

/* =======================
   LOGO
   ======================= */

const StyledLogo = styled.img`
  width: 9.5rem;
  background-color: transparent;
`;

const StyledLogoText = styled.span`
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 600;
  font-size: 2.8rem;
  letter-spacing: 0.1rem;
  color: #4f46e5;
  white-space: nowrap;
  align-self: center;
  display: inline-block;
`;

/* =======================
   BUTTON BASE
   ======================= */

const StyledButton = styled.button`
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 500;

  border: none;
  padding: 0;
  margin: 0;
  background: none;
  cursor: pointer;
  max-width: 10rem;

  transition: color 0.2s ease, transform 0.15s ease;

  &:hover svg {
    color: #4f46e5;
    transform: scale(1.08);
  }

  &:active {
    transform: scale(0.96);
  }

  @media (max-width: 1082px) {
    grid-column: 1/2;
  }
`;

const SwitchGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 0;

  @media (max-width: 1082px) {
    grid-column: 1/-1;
  }
`;

const StyledButtonLogo = styled(StyledButton)`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  justify-self: start;
  max-width: none;
  width: max-content;
`;

/* =======================
   HEADER
   ======================= */

const StyledHeader = styled.header`
  display: grid;
  grid-template-columns: minmax(max-content,1fr) minmax(max-content,2fr) minmax(max-content,1fr); 
  align-items: center;

  padding: 1.2rem 2rem;
  margin-bottom: 2rem;

  background: rgba(255,255,255,0.88);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(99,102,241,0.08);

  box-shadow: 0 1px 6px rgba(15, 23, 42, 0.05);

  position: sticky;
  top: 0;
  z-index: 100;

  @media (max-width: 1082px) {
    grid-template-columns: minmax(max-content,1fr) minmax(max-content,1fr); 
    grid-template-rows: auto auto;
    row-gap: 1.6rem;
  }
`;

const IconGroup = styled.div`
  justify-self: end;
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 1082px) {
    grid-column: 2/3;
    grid-row: 1/2;
  }
`;

/* =======================
   ICON BUTTONS
   ======================= */

const StyledMenuButton = styled(StyledButton)`
  svg {
    width: 3.6rem;
    color: #475569;
    transition: color 0.2s ease, transform 0.15s ease;
  }
`;

const StyledProfileButton = styled(StyledButton)`
  svg {
    width: 3.6rem;
    color: #475569;
    transition: color 0.2s ease, transform 0.15s ease;
  }
`;

/* =======================
   SWITCH BASE
   ======================= */

const StyledSwitch = styled.button`
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 500;

  border: none;
  width: 20rem;
  height: 4.6rem;
  font-size: 2.2rem;

  background-color: rgba(79,70,229,0.1);
  color: #1e293b;
  cursor: pointer;

  transition: all 0.2s ease;
`;

/* =======================
   SWITCHES
   ======================= */

const SwitchBeWorkMate = styled(StyledSwitch)`
  font-weight: ${(props) => (props.$active ? "600" : "500")};

  border-top-left-radius: 1.4rem;
  border-bottom-left-radius: 1.4rem;

  width: 25rem;
  border-right: 0.1rem solid rgba(79,70,229,0.25);

  background-color: ${(props) =>
    props.$active ? "#4f46e5" : "rgba(79,70,229,0.1)"};

  box-shadow: ${(props) =>
    props.$active ? "0 0.5rem 1.4rem rgba(79,70,229,0.3)" : "inset 0 0 0 0.1rem rgba(79,70,229,0.15)"};

  color: ${(props) => (props.$active ? "#ffffff" : "#1e293b")};

  transform: ${(props) => (props.$active ? "scale(1.03)" : "scale(1)")};
`;

const SwitchSearchWorkMate = styled(StyledSwitch)`
  font-weight: ${(props) => (props.$active ? "600" : "500")};

  border-top-right-radius: 1.4rem;
  border-bottom-right-radius: 1.4rem;

  width: 26rem;

  background-color: ${(props) =>
    props.$active ? "#4f46e5" : "rgba(79,70,229,0.1)"};

  box-shadow: ${(props) =>
    props.$active ? "0 0.5rem 1.4rem rgba(79,70,229,0.3)" : "inset 0 0 0 0.1rem rgba(79,70,229,0.15)"};

  color: ${(props) => (props.$active ? "#ffffff" : "#1e293b")};

  transform: ${(props) => (props.$active ? "scale(1.03)" : "scale(1)")};
`;

/* =======================
   POST TASK CTA
   ======================= */

const StlyedPostTaskSwitch = styled(StyledSwitch)`
  font-weight: 600;

  border-radius: 1.6rem;
  position: absolute;
  right: 10px;
  top: 100px;
  z-index: 2;

  background: linear-gradient(135deg, #4f46e5, #6366f1);
  color: #ffffff;

  box-shadow: 0 1rem 2.5rem rgba(79,70,229,0.35);

  &:hover {
    transform: translateY(-0.2rem);
    box-shadow: 0 1.2rem 3rem rgba(79,70,229,0.45);
  }

  &:active {
    transform: translateY(0);
  }
`;


function Header() {
  const dispatch = useDispatch()
  // const queryData = queryClient.getQueryData(["user"]);
  // const user = queryData // ✅ real user object
  const {showNotificationModel,showUserModal} = useSelector((store)=>store.header)
  const {workMate,normalUser} = useSelector((store)=>store.userType)
  const navigate = useNavigate()

  function handleclick1(){
  dispatch(toggleshowUserModal())
  }
  
  function handleclick2(){
  dispatch(toggleshowNotificationModel())
  }

  function handleBeWorkMateClick() {
  dispatch(setWorkMate());
  navigate("/")
}

function handlePostWorkClick() {
  dispatch(setNormalUser());
  navigate("/");
}

  return (

    <>
     {showUserModal && <UserModal/>}
     {showNotificationModel && <NotificationModal />}
    
    <StyledHeader>

      {/* {
        normalUser && <StlyedPostTaskSwitch onClick={()=>navigate("/createtask")}>
        <span> post a task </span>
      </StlyedPostTaskSwitch>
      } */}
      

      <StyledButtonLogo onClick={()=>navigate("/")}>
      <StyledLogo src="/tmlogo27dec3.png" alt="taskmates-logo" />
      <StyledLogoText>Work Mates</StyledLogoText>
      </StyledButtonLogo>

      <SwitchGroup>

      <SwitchBeWorkMate $active={workMate} onClick={handleBeWorkMateClick}>
        <span>Be a workmate</span>
      </SwitchBeWorkMate>
      
      <SwitchSearchWorkMate $active={normalUser} onClick={handlePostWorkClick}>
        <span>Look for workmates</span>
      </SwitchSearchWorkMate>
      
      </SwitchGroup>

      <IconGroup>

      <StyledMenuButton onClick={()=> navigate("/settings")}>
        <Cog8ToothIcon />
      </StyledMenuButton>

      <StyledProfileButton onClick={()=>handleclick2()}>
        <BellIcon />
      </StyledProfileButton>

      <StyledProfileButton onClick={()=>handleclick1()}>
        <UserIcon />
      </StyledProfileButton>

      </IconGroup>

    </StyledHeader>
  </>
  );
}

export default Header;