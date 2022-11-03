import { useEffect } from 'react';
import { useState } from 'react';
import ExpandedRecipe from './expandedRecipe/expandedRecipe';
import './recipeCard.css'

export default function RecipeCard({ showAddSuccessToastMessage, showAddRejectionToastMessage, showEditSuccessToastMessage, showEditRejectionToastMessage, removeAddRecipe, removeEditRecipe, org_id, _id, author, dish, ingredients, lastEdited, preparation, prepTime, veg, type }) {
    const [ingredientCutoff, setIngredientCutoff] = useState(4)
    useEffect(() => {
        function handleResize() {
            const width = window.innerWidth
            //console.log("width=",width)
            if (width < 1300 && width > 800) {
                setIngredientCutoff(4)
                //console.log("Cutoff set to 4")
            }
            else if (width < 800 && width > 600) {
                setIngredientCutoff(3)
                //console.log("Cutoff set to 3")
            }
            else if (width < 600) {
                setIngredientCutoff(2)
                //console.log("Cutoff set to 2")
            }
            else {
                setIngredientCutoff(5)
                //console.log("Cutoff set to 5")
            }

        }
        window.addEventListener('resize', handleResize)
    }, [])
    async function seeEdits(_id) {
        var request = { "_id": _id }
        let token = localStorage.getItem("token")
        const response = await fetch("http://localhost:4000/api/admin/get-recipe-edits", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': "Bearer " + token
            },
            body: JSON.stringify(request)
        })
        await response.json().then((data) => {
            // setRecipe(data)
            //push to another page
            console.log("recieved", data)
        }).catch((error) => {
            // Your error is here!
            console.log("err", error)
        });
    }

    return (
        <div>
            <div className="card corner-logo text-center">
                <div className="tag-wrapper">
                    {veg ?
                        <div className="tag veg">Veg</div>
                        : <div className="tag non-veg">Non-Veg</div>}
                </div>
                <div className="card-body d-flex flex-column align-items-center">
                    <div className="list-group list-group-flush title">
                        <h5 className="card-title w-100 d-flex justify-content-center align-items-center">
                            <span className='title'>
                                {dish}
                            </span>
                        </h5>

                        <div className="list-group-item">
                            <div className='row'>
                                <div className="col text-muted">Ingredients</div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col">
                                    {(!!ingredients && ingredients.length > 0) ?
                                        ingredients.length < ingredientCutoff ?
                                            ingredients.map((ingredient, i) => (
                                                <span key={i} className="badge badge-warning darkgreen ml-1 text-wrap">{ingredient}</span>
                                            ))
                                            : ingredients.slice(0, ingredientCutoff).map((ingredient, i) => (
                                                <span key={i} className="badge badge-warning darkgreen ml-1 text-wrap">{ingredient}</span>
                                            ))
                                        : "None specified"
                                    }
                                    {(!!ingredients && ingredients.length > ingredientCutoff) && <span className="badge badge-warning darkgreen ml-1">+{ingredients.length - ingredientCutoff} more</span>}
                                    { }
                                </div>
                            </div>

                        </div>
                        <div className="list-group-item mt-1">
                            <div className="row">
                                <div className="col text-muted">Preparation Time: {prepTime}</div>
                            </div>
                        </div>
                        <div className="list-group-item mt-1 card-text">
                            <div className="preparation">
                                {preparation}
                            </div>
                            {type !== "editRequest" && <div className='btn btn-dark darksgreen mt-3' data-toggle="modal" data-target={"#recipeModal" + _id}>Read more</div>}
                            {type === "editRequest" && <div className='btn btn-dark darksgreen mt-3' onClick={() => seeEdits(_id)}>See Edits</div>}
                        </div>
                    </div>
                </div>
                <div className="card-footer text-muted">
                    Updated on {lastEdited} by {author}
                </div>
            </div>
            {/* Modal */}
            <ExpandedRecipe showEditSuccessToastMessage={showEditSuccessToastMessage}
                showEditRejectionToastMessage={showEditRejectionToastMessage}
                showAddSuccessToastMessage={showAddSuccessToastMessage}
                showAddRejectionToastMessage={showAddRejectionToastMessage}
                removeAddRecipe={removeAddRecipe}
                removeEditRecipe={removeEditRecipe}
                org_id={org_id}
                _id={_id}
                author={author}
                dish={dish}
                ingredients={ingredients}
                lastEdited={lastEdited}
                preparation={preparation}
                prepTime={prepTime}
                veg={veg}
                type={type} />
        </div>
    )
}
