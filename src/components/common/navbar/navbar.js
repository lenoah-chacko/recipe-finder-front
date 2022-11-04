import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar({auth,setAuth}) {
  const navigate=useNavigate()
  const [form,setForm]=useState({"dish":"","matchcase":false,"matchword":false})

function handleForm(e){
    console.log(e)
    setForm({...form,"dish":e.target.value})
}
function handleSearch(e){
  e.preventDefault()
  console.log("gonna search",form)
  if(auth==="unauthorized")
    navigate(`/search/title?dish=${form.dish}&matchcase=${form.matchcase}&matchword=${form.matchword}`)
  else
    navigate(`/admin/search/title?dish=${form.dish}&matchcase=${form.matchcase}&matchword=${form.matchword}`)
  setForm({"dish":"","matchcase":false,"matchword":false})
}
function handleLogout(){
  setAuth("unauthorized")
  localStorage.clear()
  navigate("/login")
}
  return (
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <NavLink className="navbar-brand" to='/'>
    <div className="img-fluid main-logo"/>
  </NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto ml-3">
      <li className="nav-item">
        {auth==="authorized"?
              <NavLink to='/admin/find' className={({isActive})=>{return isActive?"nav-link active"
                                                                  :"nav-link"}}>
                Find a Recipe
              </NavLink>
              :
              <NavLink to='/find' className={({isActive})=>{return isActive?"nav-link active"
                                                                  :"nav-link"}}>
                Find a Recipe
              </NavLink>}
      </li>
      <li className="nav-item">
          <NavLink to='/all-recipes' className={({isActive})=>{return isActive?"nav-link active"
                                                            :"nav-link"}}>
            All Recipes
          </NavLink>
      </li>
      <li className="nav-item">
        {auth==="authorized"?
              <NavLink to='/admin/add-recipe' className={({isActive})=>{return isActive?"nav-link active"
                                                                                        :"nav-link"}}>
                Suggest a Recipe
              </NavLink>
              :<NavLink to='/add-recipe' className={({isActive})=>{return isActive?"nav-link active"
                                                                                  :"nav-link"}}>
                Suggest a Recipe
                </NavLink>
        }
      </li>
      <li className="nav-item">
      {auth==="authorized"&&
                          <NavLink to='/dashboard' className={({isActive})=>{return isActive?"nav-link active"
                                                                              :"nav-link"}}>
                            Dashboard
                          </NavLink>
    }
      </li>
    </ul>
      <div className="navbar-nav ml-3 mr-2">
      {auth==="unauthorized"?
                            <NavLink to='/login' className={({isActive})=>{return isActive?"nav-link active"
                                                                                  :"nav-link"}}>
                                Admin Login
                              </NavLink>
                              :<div className='nav-link' style={{cursor:"pointer"}} onClick={()=>{handleLogout()}}>
                                Logout
                              </div>
        }
      </div>
  </div>
  <div className="d-none d-lg-block">
      <form className=" form-inline my-2 my-lg-0" onSubmit={(e)=>{handleSearch(e)}}>
        <input className="form-control mr-sm-2" onChange={(e)=>{handleForm(e)}} value={form.dish} placeholder="Search"/>
          <div className="btn btn-outline-warning my-2 my-sm-0" onClick={(e)=>{handleSearch(e)}}>Search</div>
      </form>
  </div>
</nav>
  )
}
