import RecipeCard from './recipeCard/recipeCard'

export default function RecipeList({recipes,search}) {

  return (
    <div>
        <div className="container-fluid p-3">
            <div className="row">
                {recipes.length>0?
                                  recipes.map(recipe=>(
                                    <div key={recipe._id} className="col-xs-12 col-md-6 col-lg-4 p-4">
                                        <RecipeCard _id={recipe._id} author={recipe.author} dish={recipe.dish} ingredients={recipe.ingredients} lastEdited={recipe.lastEdited} preparation={recipe.preparation} prepTime={recipe.prepTime} veg={recipe.veg}></RecipeCard>
                                    </div>
                                  ))
                                  : search?<h4 className='mx-auto text-center'>No recipes found</h4>
                                          :<h4 className='mx-auto text-center'>No recipes added yet</h4>}
            </div>
        </div>
    </div>
  )
}
