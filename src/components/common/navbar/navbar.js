import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
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
        <NavLink to='/find' className={({isActive})=>{return isActive?"nav-link active"
                                                            :"nav-link"}}>
          Find a Recipe
        </NavLink>
      </li>
      <li className="nav-item">
          <NavLink to='/all-recipes' className={({isActive})=>{return isActive?"nav-link active"
                                                            :"nav-link"}}>
            All Recipes
          </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to='/add-recipe' className={({isActive})=>{return isActive?"nav-link active"
                                                            :"nav-link"}}>
          Suggest a recipe
        </NavLink>
      </li>
    </ul>
      <div className="navbar-nav ml-3 mr-2">
        <NavLink to='/login' className={({isActive})=>{return isActive?"nav-link active"
                                                            :"nav-link"}}>
          Admin Login
        </NavLink>
      </div>
  </div>
  <div className="d-none d-lg-block">
      <form className=" form-inline my-2 my-lg-0">
        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-warning my-2 my-sm-0" type="submit">Search</button>
      </form>
  </div>
</nav>
  )
}
