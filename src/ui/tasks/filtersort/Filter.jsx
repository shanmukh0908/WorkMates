/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */

import styles from "./Filter.module.css";
import { useReducer } from "react";
// import { useDispatch} from "react-redux";
import SortFeatures from "./SortFeatures";
import CategoryFeatures from "./CategoryFeatures";
import DistanceFeatures from "./DistanceFeatures";
import PriceFeatures from "./PriceFeatures";
import DateFeatures from "./DateFeatures";
import FilterSortButtonBox from "./FilterSortButtonBox";
import { XMarkIcon } from "@heroicons/react/24/outline";
// import { setFilters } from "../../../features/tasks/tasksSlice";

export default function Filter({setFilters,setFilterDisplay}) {

  const initialState = {
    date: null,
    amountOffered:null,
    distance: 100000,
    category:null,

    display:{
    displaydatefilter:false,
    displaypricefilter:false,
    displayproximityfilter:false,
    displaycategoryfilter:false,
    displaysortby:false,
    },

    displaysort:{
      displaydate:false,
      displaydistance:false,
      displayprice:false
    }
    
  };


  function filterReducer(state, action) {
  
  switch (action.type) {
    
    case "APPLY_DATEFILTER": {
      let date1 = new Date();
      let todate = date1.toISOString().split("T")[0] 
      
      if (action.payload === "yestarday") {
        // date1.setDate(date1.getDate() - 1);
        let formattedDate = date1.toISOString().split("T")[0];
        return { ...state, date: { from:formattedDate,to:formattedDate}, mindate: null, maxdate: null };
      }
      if(action.payload === "last3days"){
        date1.setDate(date1.getDate() - 3);
        let formattedDate = date1.toISOString().split("T")[0];
        return { ...state,date: { from:formattedDate, to:todate }, mindate: null, maxdate: null };
      }
      if(action.payload === "lastweek"){
        date1.setDate(date1.getDate() - 7);
        let formattedDate = date1.toISOString().split("T")[0];
        return { ...state,date: { from:formattedDate, to:todate }, mindate: null, maxdate: null };
      }  
      return;
    };

    case "APPLY_MINDATEFILTER": {
      const minDate = new Date(action.payload); // payload should be a valid date string
      const formattedDate = minDate.toISOString().split("T")[0];
      return {
        ...state,
        date: { from:formattedDate, to:state.date?.to || "" },
      };
    };

    case "APPLY_MAXDATEFILTER": {
      const maxDate = new Date(action.payload);
      const formattedDate = maxDate.toISOString().split("T")[0];
      return {
        ...state,
        date: { from: state.date?.from || "", to: formattedDate },
      };
    };

    case "APPLY_MINPRICEFILTER":
      return {
        ...state,
        amountOffered: 
          {gt: action.payload,
          lt: state.amountOffered?.lt || ""}
      };

    case "APPLY_MAXPRICEFILTER":
      return {
        ...state,
        amountOffered: {
          gt: state.amountOffered?.gt || "",
          lt: action.payload},
      };

    case "APPLY_DISTANCEFILTER":
      return { ...state, distance: action.payload };

    case "APPLY_CATEGORYFILTER":
      return { ...state, category: action.payload };

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
        displaysort: { ...initialState.displaysort, ...action.payload },
      };

    default:
      return state;
  }
}

  const [state, dispatch] = useReducer(filterReducer, initialState);
  // const taskDispatch = useDispatch()
  
  const filtered = Object.entries(state).filter(([key,value])=>(value != null && value!= 0 && key != "display" && key != "displaysort"))
  const filteredobj = Object.fromEntries(filtered)
  
 async function handleApply() {
  console.log(filteredobj);
  try {
    setFilters(filteredobj);
    setFilterDisplay(false)
  } catch (err) {
    console.error("Error fetching tasks:", err);
  }
}

  
  return (
    <div className={styles.filterSort}>
      <button className={styles.closebutton} onClick={()=>{setFilterDisplay(false)}}>
            <XMarkIcon className={styles.svgicon} />
      </button>
      <button className={styles.applyButton} onClick={()=>handleApply()}>Apply</button>
      

      <FilterSortButtonBox dispatch={dispatch} styles={styles} state={state}/>

      <div className={styles.filterItemFeatures}>
        {/* DATE */}
        {state?.display?.displaydatefilter && <DateFeatures dispatch={dispatch} styles={styles} state={state} />}

        {/* PRICE */}
        {state?.display?.displaypricefilter && <PriceFeatures dispatch={dispatch} styles={styles} state={state} />}

        {/* DISTANCE */}
        {state?.display?.displayproximityfilter && <DistanceFeatures dispatch={dispatch} styles={styles} state={state}/> }

        {/* CATEGORY */}
        {state?.display?.displaycategoryfilter && <CategoryFeatures dispatch={dispatch} styles={styles} state={state}/>}

        {/* SORT OPTIONS */}
        {state?.display?.displaysortby && <SortFeatures dispatch={dispatch} styles={styles} state={state}/>}
      </div>

    </div>
  );
}













