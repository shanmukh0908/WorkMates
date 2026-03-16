import styles from "./workMatesFilter.module.css"

export default function DistanceFeatures({dispatch,state}){
    return(
        <div className={styles.distanceRange}>
          <div className={styles.distanceOptions} >
            <button className={styles.distanceOption} onClick={() =>
                dispatch({ type: "APPLY_DISTANCEFILTER", payload: 1 })
              }>
              <p>Within 1 km</p>
            </button>
            <button className={styles.distanceOption} onClick={() =>
                dispatch({ type: "APPLY_DISTANCEFILTER", payload: 5 })
              }>
              <p>Within 5 km</p>
            </button>
            <button className={styles.distanceOption} onClick={() =>
                dispatch({ type: "APPLY_DISTANCEFILTER", payload: 10 })
              }>
              <p>Within 10 km</p>
            </button>
            <button className={styles.distanceOption} onClick={() =>
                dispatch({ type: "APPLY_DISTANCEFILTER", payload: 20 })
              }>
              <p>Within 20 km</p>
            </button>
          </div>
          <div className={styles.distanceInput}>
            <p className={styles.inputDistanceText}>
              Enter your distance choice below
            </p>
            <div className={styles.distanceInputBox}>
              <span>Within</span>
              <input type="text" className={styles.distanceInputText} value={state.distance ?? "0"} 
              onChange={(e)=> dispatch({type:"APPLY_DISTANCEFILTER",payload:`${e.target.value}`})}/>
              <span>km</span>
            </div>
          </div>
        </div>
    )
}