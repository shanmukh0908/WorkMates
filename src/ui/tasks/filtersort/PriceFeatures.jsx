export default function PriceFeatures({dispatch,styles,state}){
    return (
        <div className={styles.priceRange}>
          <p>Select a price range </p>

          {/* Min price slider */}
          <div className={styles.sliderBox}>
            <p>Min price</p>
            <input
              type="range"
              id="minrange"
              name="minrange"
              min="0"
              max="1000"
              value={state.amountOffered?.gt || ""}
              onChange={(e) =>
                dispatch({
                  type: "APPLY_MINPRICEFILTER",
                  payload: e.target.value,
                })
              }
            />
            <output className={styles.resultmin}>{state.amountOffered?.gt || 0}</output>
          </div>

          {/* Max price slider */}
          <div className={styles.sliderBox}>
            <p>Max price</p>
            <input
              type="range"
              id="maxrange"
              name="maxrange"
              min="0"
              max="1000"
              value={state.amountOffered?.lt || ""}
              onChange={(e) =>
                dispatch({
                  type: "APPLY_MAXPRICEFILTER",
                  payload: e.target.value,
                })
              }
            />
            <output className={styles.resultmax}>{state.amountOffered?.lt || 0 }</output>
          </div>
        </div>
    )
}