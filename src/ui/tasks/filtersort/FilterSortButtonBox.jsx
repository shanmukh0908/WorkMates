import { BanknotesIcon,MapIcon,ListBulletIcon,ArrowsUpDownIcon,CalendarDateRangeIcon} from "@heroicons/react/24/outline";

export default function FilterSortButtonBox({dispatch,styles,state}){

    return(
        <div className={styles.filterItems}>
        <button className={state?.display?.displaydatefilter ? `${styles.filterItemButton} ${styles.activefeature}`  : `${styles.filterItemButton}` } 
        onClick={()=>dispatch({type:"APPLY_DISPLAY",payload:{displaydatefilter:true}})}>
          <span>
            <CalendarDateRangeIcon className={styles.svgicon}/>
          </span>
          <span>Date</span>
        </button>

        <button className={state?.display?.displaypricefilter ? `${styles.filterItemButton} ${styles.activefeature}`  : `${styles.filterItemButton}` } data-value="price"
        onClick={()=>dispatch({type:"APPLY_DISPLAY",payload:{displaypricefilter:true}})}>
          <span>
            <BanknotesIcon className={styles.svgicon}/>
          </span>
          <span>Price</span>
        </button>

        <button className={state?.display?.displayproximityfilter ? `${styles.filterItemButton} ${styles.activefeature}`  : `${styles.filterItemButton}` } data-value="proximity"
        onClick={()=>dispatch({type:"APPLY_DISPLAY",payload:{displayproximityfilter:true}})}>
          <MapIcon className={styles.svgicon} />
          <span>Proximity</span>
        </button>

        <button className={state?.display?.displaycategoryfilter ? `${styles.filterItemButton} ${styles.activefeature}`  : `${styles.filterItemButton}` } data-value="category"
        onClick={()=>dispatch({type:"APPLY_DISPLAY",payload:{displaycategoryfilter:true}})}>
          <ListBulletIcon className={styles.svgicon} />
          <span>Category</span>
        </button>

        <button className={state?.display?.displaysortby ? `${styles.filterItemButton} ${styles.activefeature}`  : `${styles.filterItemButton}` } data-value="sort-by"
        onClick={()=>dispatch({type:"APPLY_DISPLAY",payload:{displaysortby:true}})}>
          <ArrowsUpDownIcon className={styles.svgicon} />
          <span>Sort By</span>
        </button>
      </div>
    )

}