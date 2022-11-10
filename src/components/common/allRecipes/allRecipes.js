import React from 'react'
import RecipeList from '../recipeList/recipeList'
import './allRecipes.css'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function AllRecipes({auth}) {
  const [recipes,setRecipes]=useState([])
  const [currentPage,setCurrentPage]=useState(0)
  useEffect(()=>{
      getRecipes({"page":currentPage})
  },[currentPage])
  async function getRecipes(req){
      const response = await fetch("https://recipe-finder24.herokuapp.com/api/get-recipes",{
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req)
    })
      await response.json().then((data)=>{
      setRecipes(data)
      console.log(data)
    })
  }

  function removeAllRecipe(id){
    console.log("removeAllRecipe", id)
    var tempRecipes = recipes.filter((recipe) => { return recipe._id !== id })
    console.log("tempRecipes", tempRecipes)
    setRecipes(tempRecipes)
  }
  function prevPage(){
    console.log("trying")
    if(currentPage>0){
      console.log("decremented")
      setCurrentPage(currentPage-1)
    }
  }
  function nextPage(){
    console.log("trying")
    if(recipes.length>0){
      console.log("incremented")
      setCurrentPage(currentPage+1)
    }
  }
  return (
    <div>
        <div id="allRecipes" className="jumbotron">
          <div className="px-5">
              <h1 className="display-4">All Recipes</h1>
              <p className="lead">List of all recipes approved by RecipeFinder™</p>
              <hr className='my-4' style={{background: 'gray',height: '3px'}}/>          
              <div className="lead">
                <div className="row">
                    <div className='col-auto mb-3 mb-md-0 mx-auto d-flex flex-column'>
                        <span className='my-auto'>
                            Search for a specific recipe instead
                        </span>
                    </div>
                    <div className='col'>
                        {auth==="unauthorized"?
                                            <Link className="btn btn-warning btn-lg ml-3" to='/find'>
                                                Go to our Search Engine
                                            </Link>
                                            :auth==="authorized"&&<Link className="btn btn-warning btn-lg ml-3" to='/admin/find'>
                                                Go to our Search Engine
                                            </Link>}
                    </div>
                </div>
              </div>
          </div>
        </div>
        <div className='container-fluid'>
            <nav className='d-flex justify-content-center' aria-label="Page navigation">
              <ul class="pagination">
                  <li class="page-item">
                  <a class="page-link" onClick={()=>{prevPage()}} aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                  </a>
                  </li>
                  <li class="page-item"><a class="page-link" >Page {currentPage+1}</a></li>
                  <li class="page-item">
                  <a class="page-link" onClick={()=>{nextPage()}} aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                  </a>
                  </li>
              </ul>
            </nav>
            <RecipeList removeAllRecipe={removeAllRecipe} recipes={recipes} auth={auth} type={"all"} setRecipes={setRecipes}></RecipeList>
        </div>
    </div>
  )
}
