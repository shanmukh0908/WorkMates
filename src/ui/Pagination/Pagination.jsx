/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */

import { useSearchParams } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import styles from "./Pagination.module.css";

export default function Pagination({ count, pageSize }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const pageCount = Math.ceil(count / pageSize);

  function nextPage() {
    // Guard clause prevents unnecessary state updates
    if (currentPage === pageCount) return; 
    
    searchParams.set("page", currentPage + 1);
    setSearchParams(searchParams);
  }

  function prevPage() {
    if (currentPage === 1) return;
    
    searchParams.set("page", currentPage - 1);
    setSearchParams(searchParams);
  }

  // React strictly expects 'null' instead of empty return for rendering nothing
  if (pageCount <= 1) return null; 

  return (
    <div className={styles.paginationBox}>
      <button 
        className={styles.iconButton} 
        onClick={prevPage} 
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ChevronLeftIcon className={styles.leftArrow} />
      </button>

      <span>Page {currentPage} of {pageCount}</span>

      <button 
        className={styles.iconButton} 
        onClick={nextPage} 
        disabled={currentPage === pageCount}
        aria-label="Next page"
      >
        <ChevronRightIcon className={styles.rightArrow} />
      </button>
    </div>
  );
}