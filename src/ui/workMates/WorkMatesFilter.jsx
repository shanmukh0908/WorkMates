/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
import styles from "./workMatesFilter.module.css"
import { useMemo, useReducer, useState } from "react";
import SortFeatures from "./WorkMatesSortFeatures";
import CategoryFeatures from "./CategoryFeatures";
import DistanceFeatures from "./DistanceFeatures";
import FilterSortButtonBox from "./WorkMatesFilterSortButtonBox";
import { XMarkIcon } from "@heroicons/react/24/outline";
// import useGetAllWorkMates from "../../hooks/workMates/useGetAllWorkMates";

export default function WorkMatesFilter({ setFilterDisplay,setFilters,filters }) {
  const initialState = {
    distance: 100000,
    skills: null,

    display: {
      displayproximityfilter: false,
      displaycategoryfilter: false,
      displaysortby: false,
    },

    displaysort: {
      displaydistance: false,
    },
  };

  function filterReducer(state, action) {
    switch (action.type) {
      case "APPLY_DISTANCEFILTER":
        return { ...state, distance: action.payload };

      case "APPLY_CATEGORYFILTER":
        return { ...state, skills: action.payload };

      case "APPLY_SORTBY":
        return { ...state, sort: action.payload };

      case "APPLY_DISPLAY":
        return {
          ...state,
          display: { ...initialState.display, ...action.payload },
        };

      case "APPLY_DISPLAYSORT":
        return {
          ...state,
          displaysort: { ...state.displaysort, ...action.payload },
        };

      default:
        return state;
    }
  }

  
  const stored = localStorage.getItem("userLocation");
  let userLocation = JSON.parse(stored);
  const [state, dispatch] = useReducer(filterReducer, initialState);
  
  // const { data, isFetching } = useGetAllWorkMates(userLocation, filters);

 const filteredobj = useMemo(() => {
  const filtered = Object.entries(state).filter(
    ([key, value]) =>
      value !== null &&
      key !== "display" &&
      key !== "displaysort"
  );
  return Object.fromEntries(filtered);
}, [{...state}]);


  async function handleApply() {
    console.log(filteredobj,">>>>filtered obj");
    try {
      setFilters({ ...filteredobj });
      setFilterDisplay(false)
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  }

  return (
    <div className={styles.filterSort}>
      <button className={styles.applyButton} onClick={handleApply}>
        Apply
      </button>

      <FilterSortButtonBox dispatch={dispatch} styles={styles} state={state} />
      
      <button className={styles.closebutton} onClick={()=>{setFilterDisplay(false)}}>
            <XMarkIcon className={styles.svgicon} />
      </button>

      <div className={styles.filterItemFeatures}>
        {state?.display?.displayproximityfilter && (
          <DistanceFeatures dispatch={dispatch} styles={styles} state={state} />
        )}

        {state?.display?.displaycategoryfilter && (
          <CategoryFeatures dispatch={dispatch} styles={styles} state={state} />
        )}

        {state?.display?.displaysortby && (
          <SortFeatures dispatch={dispatch} styles={styles} state={state} />
        )}
      </div>
    </div>
  );
}
