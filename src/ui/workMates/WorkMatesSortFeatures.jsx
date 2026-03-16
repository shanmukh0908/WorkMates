import styles from "./workMatesFilter.module.css"

export default function SortFeatures({dispatch,state}){
    return (
        <div className={styles.sortOptions}>
                  <p className={styles.sortOptionsText}>SORT BY</p>
                  <div className={styles.sortOptionsBox}>

                    <button
                      className={
                        state.displaysort?.displaydistance
                          ? `${styles.sortOption} ${styles.activefeature}`
                          : styles.sortOption
                      }
                      data-value="distance"
                      onClick={() => {
                        dispatch({ type: "APPLY_SORTBY", payload: "distance" });
                        dispatch({ type: "APPLY_DISPLAYSORT", payload: {displaydistance:true} });
                      }}
                    >
                      <p>DISTANCE</p>
                    </button>

                  </div>
                </div>
    )
}