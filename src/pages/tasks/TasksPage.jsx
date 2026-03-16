/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */

import SavedTasks from "./SavedTasks";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {styled,css} from "styled-components";
import { useSearchParams } from "react-router-dom";


import {AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";


import useFilteredTasks from "../../hooks/tasks/useFilteredTasks"


import styles from "./TasksPage.module.css"
import Filter from "../../ui/tasks/filtersort/Filter";
import Pagination from "../../ui/Pagination/Pagination";


const TaskContainer = styled.div`

  flex:1;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 4rem;

  ${({ showoverlay }) =>
    showoverlay && css`
      &::before {
        content: "";
        position: fixed;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(6px);
        background-color: rgba(255, 255, 255, 0.1); 
        z-index: 10; 
      }
    `}

  
    
`;


export default function TasksPage(){

const navigate = useNavigate()

const [filters,setFilters] = useState({})

  
  console.log(filters,"*******")

  let userLocation = location


  const storedLocation = localStorage.getItem("userLocation")
  userLocation = JSON.parse(storedLocation)

  console.log(userLocation)
  
  let taskfilters = useMemo(()=>
    {
      const base = {location: `${userLocation[0]},${userLocation[1]}`,distance:100000}
      return filters ? { ...base, ...filters } : base; 
      },[userLocation, JSON.stringify(filters)])

 
  const { data:filtertaskdata,refetch:refetchfiltered, isFetching:isFetchingFiltered } = useFilteredTasks(taskfilters); 
  console.log(filtertaskdata)
  
  
  const count = filtertaskdata?.length
  const pageSize = 9
  const pageCount = Math.ceil(count/pageSize)
  const [filterDisplay,setFilterDisplay] = useState(false)
  const [searchParams,setSearchParams] = useSearchParams()
  
  const currentPage = Number(searchParams.get("page")) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filtertaskdata?.length);

  function handleFilterClick(){
    setFilterDisplay( prev => !prev)
  }


    return (
    <TaskContainer showoverlay = {filterDisplay}> 

    { (userLocation.length === 2  && filtertaskdata?.length > 0)  ?
      <div className={styles.ListBox}>

        <div className={styles.FilterIcon}>
        <AdjustmentsHorizontalIcon onClick={handleFilterClick} className={styles.svgicon}/>
        </div>

        <div className={styles.FilterBox}>
        {filterDisplay ? <Filter setFilters={setFilters} setFilterDisplay={setFilterDisplay} /> : ""}
        </div>

      <ul className={styles.taskList}>
        {filtertaskdata.slice(startIndex,endIndex).map((task, index) => (
          <li key={index} className={styles.taskListItem} onClick={()=>navigate("/tasks/123", { state: {task} })}>
          
            <div className={styles.user}>
              <img src={
                task?.createdBy?.profilePhoto ? 
                (task.createdBy.profilePhoto.startsWith("https://res.cloudinary.com")
                ?`${task.createdBy.profilePhoto}`:`http://localhost:3000/public/profilephotos/${task.createdBy.profilePhoto}`) 
                : "/tmuser1.png"
                } 
                alt="user1" className={styles.userImg} />
              <p className={styles.userName}>{task?.createdBy?.name || "abc"}</p>
            </div>
            <p>{task?.distanceFromUser || "100"} km</p>
            <p>Category: {task?.category || "abc"}</p>
            <SavedTasks styles = {styles} task={task} /> 
          </li>
        ))}
      </ul> </div>: filtertaskdata?.length > 0  ? <h1>LOADING...</h1>  : 
      <div className={styles.gobackLink} onClick={() => navigate(-1)} >
      no tasks to display with your required details... <span>Go back</span>
    </div>
    }

    <div className={styles.pagination}>
    <Pagination count={filtertaskdata?.length} pageSize={pageSize}/>
    </div>

    </TaskContainer>
  ); 
}