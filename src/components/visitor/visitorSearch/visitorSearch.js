import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './visitorSearch.css'

export default function VisitorSearch() {

const navigate= useNavigate()
const [form,setForm]=useState({"dish":"","matchcase":false,"matchword":false})
function handleDish(e){
    console.log(e)
    setForm({...form,"dish":e.target.value})
}
function handleCase(e){
    console.log(e)
    setForm({...form,"matchcase":e.target.checked})
}
function handleWord(e){
    console.log(e)
    setForm({...form,"matchword":e.target.checked})
}
function handleSearch(e){
    e.preventDefault()
    console.log("gonna search",form)
    navigate(`/search?dish=${form.dish}&matchcase=${form.matchcase}&matchword=${form.matchword}`)
}
return (
    <div className='height'>
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-8 mt-5">
                <div className="search-logo"></div>
                    <form>
                        <div className="search">
                            <i className="fa fa-search"></i>                        
                            <input type="text" className="form-control" onChange={(e)=>handleDish(e)} placeholder="Search for a recipe"/>
                            <button className="btn btn-warning" onClick={(e)=>handleSearch(e)}>Search</button>
                        </div>
                        <div className="d-flex mt-3 text-center">
                            <div className="col text-right">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" onChange={(e)=>handleCase(e)} type="checkbox" value="" id="defaultCheck1"/>
                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                        Match Case
                                    </label>
                                </div>
                            </div>
                            <div className='col text-left'>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" onChange={(e)=>handleWord(e)} type="checkbox" value="" id="defaultCheck2"/>
                                    <label className="form-check-label" htmlFor="defaultCheck2">
                                        Match Word
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div className="doodles"></div>
    </div>
  )
}
