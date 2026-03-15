/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */

import { useSearchParams } from "react-router-dom"
import { ChevronLeftIcon,ChevronRightIcon } from "@heroicons/react/24/outline"

import styles from "./Pagination.module.css"

export default function Pagination({count,pageSize}){
const [searchParams,setSearchParams] = useSearchParams()
const currentPage  = Number(searchParams.get("page")) || 1;
const pageCount = Math.ceil(count/pageSize) 

function nextPage(){
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page",next)
    setSearchParams(searchParams)
}

function prevPage(){
    const prev = currentPage === 1 ? currentPage : currentPage -1;
    searchParams.set("page",prev)
    setSearchParams(searchParams)
}

if(pageCount <= 1){return}

return (
    <div className={styles.paginationBox}>
        <ChevronLeftIcon className={styles.leftArrow} onClick={()=>prevPage()}/>
        <span>page {currentPage} of {pageCount} pages</span>
        <ChevronRightIcon  className={styles.rightArrow} onClick={()=>nextPage()}/>
    </div>
)

}