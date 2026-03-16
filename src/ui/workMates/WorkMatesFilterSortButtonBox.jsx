import { BanknotesIcon,MapIcon,ListBulletIcon,ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import styles from "./workMatesFilter.module.css"

export default function FilterSortButtonBox({dispatch,state}){

    return(
        <div className={styles.filterItems}>

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