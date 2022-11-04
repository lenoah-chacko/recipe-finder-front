import RecipeCard from './recipeCard/recipeCard'
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react'

export default function RecipeList({removeAddRecipe,removeEditRecipe,recipes,setRecipes,type,originalRecipe,auth}) {

    useEffect(() => {
        console.log("RecipeList",recipes,originalRecipe)
    }, [recipes,originalRecipe])
    function showEditSuccessToastMessage(){
        console.log("Approved")
        toast.success('Edit request approved!', {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    function showEditRejectionToastMessage(){
        console.log("rejected")
        toast.error('Edit request rejected!', {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    function showAddSuccessToastMessage(){
        console.log("Approved")
        toast.success('Submission request approved!', {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    function showAddRejectionToastMessage(){
        console.log("rejected")
        toast.error('Submission request rejected!', {
            position: toast.POSITION.TOP_RIGHT
        });
    };

  return (
    <div>
        <div className="container-fluid p-3">
            <div className="row">
                {recipes.length>0?
                                  recipes.map((recipe,id)=>(
                                    <div key={id} className="col-xs-12 col-md-6 col-lg-4 p-4">
                                        <RecipeCard
                                          org_id={!!originalRecipe?originalRecipe._id:null}
                                          _id={recipe._id}
                                          author={!!recipe.author?recipe.author:originalRecipe.author}
                                          dish={!!recipe.dish?recipe.dish:originalRecipe.dish}
                                          ingredients={!!recipe.ingredients?recipe.ingredients:originalRecipe.ingredients}
                                          lastEdited={!!recipe.lastEdited?recipe.lastEdited:originalRecipe.lastEdited}
                                          preparation={!!recipe.preparation?recipe.preparation:originalRecipe.preparation}
                                          prepTime={!!recipe.prepTime?recipe.prepTime:originalRecipe.prepTime}
                                          veg={(recipe.veg!=null)?recipe.veg:originalRecipe.veg}
                                          type={type}
                                          removeEditRecipe={removeEditRecipe}
                                          removeAddRecipe={removeAddRecipe}
                                          showEditSuccessToastMessage={showEditSuccessToastMessage}
                                          showEditRejectionToastMessage={showEditRejectionToastMessage}
                                          showAddSuccessToastMessage={showAddSuccessToastMessage}
                                          showAddRejectionToastMessage={showAddRejectionToastMessage}
                                          auth={auth}></RecipeCard>
                                    </div>
                                  ))
                                  :type==="all"?<h4 className='mx-auto text-center'>No recipes added yet</h4>
                                  :type==="search"?<h4 className='mx-auto text-center'>No recipes found</h4>
                                  :type==="addRequest"?<h4 className='mx-auto text-center'>No pending add requests</h4>
                                  :type==="editRequest"?<h4 className='mx-auto text-center'>No pending edit requests</h4>
                                  :type==="editsOnly"&&<h4 className='mx-auto text-center'>No pending edits</h4>}
            </div>
        </div>
        <ToastContainer />
    </div>
  )
}
