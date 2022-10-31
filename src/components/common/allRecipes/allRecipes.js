import React from 'react'
import RecipeList from '../recipeList/recipeList'
import './allRecipes.css'

export default function AllRecipes() {
  return (
    <div>
        <div id="allRecipes" class="jumbotron">
          <div className="px-5">
              <h1 class="display-4">All Recipes</h1>
              <p class="lead">List of all recipes approved by RecipeFinder©</p>
              <hr className='my-4' style={{background: 'gray',height: '3px'}}/>          
              <p class="lead">
                    <div className='mb-3 d-inline-block'>Search for a specific recipe instead</div>
                    <a class="btn btn-success btn-lg ml-3" href="#" role="button">Go to our Search Engine</a>
              </p>
          </div>
        </div>
        <div className='container-fluid'>
            <RecipeList></RecipeList>
        </div>
        
    </div>
  )
}
