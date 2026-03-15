export default function DateFeatures({dispatch,styles,state}){
    return (
        <div className={styles.dateFeatures}>
          
          <div className={styles.previousDays}>
            <button
              className={styles.previousDaysButton}
              onClick={() =>
                dispatch({ type: "APPLY_DATEFILTER", payload: "yestarday" })
              }
            >
              <p>yestarday</p>
            </button>
            <button
              className={styles.previousDaysButton}
              onClick={() =>
                dispatch({ type: "APPLY_DATEFILTER", payload: "last3days" })
              }
            >
              <p>last 3 days</p>
            </button>
            <button
              className={styles.previousDaysButton}
              onClick={() =>
                dispatch({ type: "APPLY_DATEFILTER", payload: "lastweek" })
              }
            >
              <p>last week</p>
            </button>
          </div>

          <div className={styles.daysRangeBoxes}>
            <input
              type="date"
              className={styles.daysRangeBox1}
              value={state.date?.from ?? ""}
              onChange={(e) =>
                dispatch({
                  type: "APPLY_MINDATEFILTER",
                  payload: e.target.value,
                })
              }
            />
            <input
              type="date"
              className={styles.daysRangeBox2}
              value={state.date?.to  ?? ""}
              onChange={(e) =>
                dispatch({
                  type: "APPLY_MAXDATEFILTER",
                  payload: e.target.value,
                })
              }
            />
          </div>
        </div>
    )
}