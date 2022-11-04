import React from 'react'
import RecipeList from '../recipeList/recipeList'
import './allRecipes.css'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function AllRecipes({auth}) {
  const [recipes,setRecipes]=useState([])
  useEffect(()=>{
      getRecipes()
  },[])
  async function getRecipes(){
    console.log("Buha")
      const response = await fetch("http://localhost:4000/api/get-recipes")
      await response.json().then((data)=>{
      setRecipes(data)
      console.log(data)
    })
  }
  return (
    <div>
        <div id="allRecipes" className="jumbotron">
          <div className="px-5">
              <h1 className="display-4">All Recipes</h1>
              <p className="lead">List of all recipes approved by RecipeFinder©</p>
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
            <RecipeList recipes={recipes} auth={auth} type={"all"} setRecipes={setRecipes}></RecipeList>
        </div>
    </div>
  )
}
