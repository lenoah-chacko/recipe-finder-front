import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SearchByTitle from '../../common/searchByTitle.js/searchByTitle'
import SearchByIngredients from './searchByIngredients/searchByIngredients'
import './visitorSearch.css'

export default function VisitorSearch() {
    const [searchType,setSearchType]=useState(true)
    function selectIngredients(){
        setSearchType(false)
        console.log("ingredients")
    }
    function selectTitle(){
        setSearchType(true)
        console.log("title")
    }
return (
    <div className='height'>
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-8 mt-5">
                <div className="search-logo"></div>
                <nav class="row g-0 mb-4">
                    <div className="col">
                        <div to='' className={searchType?"btn btn-warning w-100":"btn btn-light w-100"} aria-current="page" onClick={()=>{selectTitle()}}>Search by Title</div>
                    </div>
                    <div className="col">
                        <div to='' className={!searchType?"btn btn-warning w-100":"btn btn-light w-100"} onClick={()=>{selectIngredients()}}>Search by Ingredients</div>
                    </div>
                </nav>
                    {searchType?<SearchByTitle/>:<SearchByIngredients/>}
                </div>
            </div>
        </div>
        <div className="doodles"></div>
    </div>
  )
}
