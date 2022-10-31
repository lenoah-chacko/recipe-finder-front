import React from 'react'

export default function Navbar() {
  return (
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <a className="navbar-brand" href="#">
  <div className="img-fluid main-logo"/>
  </a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto ml-3">
      <li className="nav-item active">
        <a className="nav-link" href="#">All Recipes<span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Suggest a recipe</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Find a Recipe</a>
      </li>
    </ul>
      <div className="navbar-nav ml-3 mr-2">
        <a className="nav-link" href="#">Admin Login</a>
      </div>
  </div>
  <div className="d-none d-lg-block">
      <form class=" form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
  </div>
</nav>
  )
}
