import React from 'react'
import RecipeList from '../recipeList/recipeList'
import './allRecipes.css'

export default function AllRecipes() {
  return (
    <div>
        <div id="allRecipes" className="jumbotron">
          <div className="px-5">
              <h1 className="display-4">All Recipes</h1>
              <p className="lead">List of all recipes approved by RecipeFinder©</p>
              <hr className='my-4' style={{background: 'gray',height: '3px'}}/>          
              <div className="lead">
                    <div className='mb-3 d-inline-block'>Search for a specific recipe instead</div>
                    <a className="btn btn-success btn-lg ml-3" href="#" role="button">Go to our Search Engine</a>
              </div>
          </div>
        </div>
        <div className='container-fluid'>
            <RecipeList></RecipeList>
        </div>
        
    </div>
  )
}
