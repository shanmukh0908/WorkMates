export default function SortFeatures({dispatch,styles,state}){
    return (
        <div className={styles.sortOptions}>
                  <p className={styles.sortOptionsText}>SORT BY</p>
                  <div className={styles.sortOptionsBox}>

                    <button
                      className={
                        state.displaysort.displaydate
                          ? `${styles.sortOption} ${styles.activefeature}`
                          : styles.sortOption
                      }
                      data-value="date"
                      onClick={() => {
                        dispatch({ type: "APPLY_SORTBY", payload: "date" });
                        dispatch({ type: "APPLY_DISPLAYSORT", payload: {displaydate:true} });
                      }}
                    >
                      <p>DATE</p>
                    </button>

                    <button
                      className={
                        state.displaysort?.displayprice
                          ? `${styles.sortOption} ${styles.activefeature}`
                          : styles.sortOption
                      }
                      data-value="price"
                      onClick={() => {
                        dispatch({ type: "APPLY_SORTBY", payload: "price" });
                        dispatch({ type: "APPLY_DISPLAYSORT", payload: {displayprice:true} });
                      }}
                    >
                      <p>PRICE</p>
                    </button>

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