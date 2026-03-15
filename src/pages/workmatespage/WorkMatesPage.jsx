/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */

import useGetAllWorkMates from "../../hooks/workMates/useGetAllWorkMates";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { styled, css } from "styled-components";
import { AdjustmentsHorizontalIcon} from "@heroicons/react/24/outline";
import styles from "./WorkMatesPage.module.css";
import Filter from "../../ui/workMates/WorkMatesFilter"
import Pagination from "../../ui/Pagination/Pagination";

const WorkMatesContainer = styled.div`
  flex: 1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: min(10%, 7rem);
  row-gap: 4rem;
  
  /* Required if you want the overlay to stay within this container */
  position: relative; 

  ${({ showoverlay }) =>
    showoverlay &&
    css`
      &::before {
        content: "";
        position: fixed; /* Use 'absolute' to contain it to this div */
        inset: 0;
        background-color: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(6px);
        background-color: rgba(255, 255, 255, 0.1); // Slight tint helps the blur pop
        z-index: 10; 
      }
    `}
`;

export default function WorkMatesPage() {

  const navigate = useNavigate();
  const [filterDisplay, setFilterDisplay] = useState(false);
  const [filters, setFilters] = useState({});
  const [searchParams] = useSearchParams();

  const stored = localStorage.getItem("userLocation");
  let userLocation = JSON.parse(stored);
  

  const { data:workmatesdata, isFetching,refetch } = useGetAllWorkMates(userLocation,filters);
  console.log(workmatesdata?.data,"from workmates page >>>****",workmatesdata?.data.length)

  const pageSize = 9;
  const currentPage = Number(searchParams.get("page")) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  function handleFilterClick() {
    setFilterDisplay((prev) => !prev);
  }

  return (
    <WorkMatesContainer showoverlay={filterDisplay}>
      {isFetching ? (
        <h1>LOADING...</h1>
      ) : workmatesdata?.data.length > 0 ? (
        <div className={styles.ListBox}>
          {/* Filter Icon */}
          <div className={styles.FilterIcon}>
            <AdjustmentsHorizontalIcon
              onClick={handleFilterClick}
              className={styles.svgicon}
            />
          </div>

          {/* Filter Box */}
          <div className={styles.FilterBox}>
            {filterDisplay && (
              <Filter
                refetch={refetch}
                setFilterDisplay={setFilterDisplay}
                filters={filters}
                setFilters={setFilters}
              />
            )}
          </div>

          {/* Workmates List */}
          <ul className={styles.workmateList}>
            {workmatesdata.data.slice(startIndex, endIndex).map((workmate, index) => (
              <li
                key={index}
                className={styles.workmateListItem}
                onClick={() => navigate("/workmates/123", { state: { workmate } })}
              >
                <div className={styles.user}>
                  <img
                    src={
                      workmate?.workMate?.profilePhoto
                        ? 
                        (workmate.workMate.profilePhoto?.startsWith("https://res.cloudinary.com") ?`${workmate.workMate.profilePhoto}`:`http://localhost:3000/public/profilephotos/${workmate.workMate.profilePhoto}`)
                        : "/tmuser1.png"
                    }
                    alt="user"
                    className={styles.userImg}
                  />
                  <p className={styles.userName}>{workmate.workMate.name}</p>
                </div>
                <p className={styles.distance}>{Number(workmate.distanceFromUser.toFixed(1))} km</p>
                {workmate?.workMate?.rating  && (<p className={styles.rating}> rating : {workmate?.workMate?.rating }/ 5</p>)}
                
              </li>
            ))}
          </ul>

          {/* Pagination */}
          <div className={styles.pagination}>
            <Pagination count={workmatesdata.data.length} pageSize={pageSize} />
          </div>
        </div>
      ) : (
        <h1>No Workmates Found</h1>
      )}
    </WorkMatesContainer>
  );
}