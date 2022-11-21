import '../expandedRecipe/expandedRecipe.css'
import { MDBInput } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';

export default function EditRecipe(
    {showEditReqSuccessToastMessage, _id, author, dish, ingredients, lastEdited, preparation, prepTime, veg, auth}) {

    const [ingredient, setIngredient] = useState("")
    const [_author, setAuthor] = useState(author)
    const [_dish, setDish] = useState(dish)
    const [_ingredients, setIngredients] = useState(ingredients)
    const [_preparation, setPreparation] = useState(preparation)
    const [_prepTime, setPrepTime] = useState(prepTime)
    const [_veg, setVeg] = useState(veg)

    useEffect(() => {
        setAuthor(author);
        setDish(dish);
        setIngredients(ingredients);
        setPreparation(preparation);
        setPrepTime(prepTime);
        setVeg(veg);
    }, [author, dish, ingredients, preparation, prepTime, veg])

    function handleAuthor(e) {
        console.log(e.target.value)
        setAuthor(e.target.value)
    }
    function handleDish(e) {
        console.log(e.target.value)
        setDish(e.target.value)
    }

    function handlePreparation(e) {
        console.log(e.target.value)
        setPreparation(e.target.value)
    }

    function handlePrepTime(e) {
        console.log(e.target.value)
        setPrepTime(e.target.value)
    }

    function handleVeg(e) {
        setVeg(e.target.value === "veg")
    }

    function handleIngredient(e) {
        setIngredient(e.target.value)
        console.log(e.target.value)
    }
    function addIngredient(e) {
        console.log("event", e.type, "key", e.key)
        if (e.type === "click" || (e.type === "keydown" && e.key === 'Enter')) {
            setIngredients([..._ingredients, ingredient])
            setIngredient("")
        }
    }

    function removeIngredient(id) {
        console.log("id=", id)
        const newIngredients = _ingredients.slice(0, id).concat(_ingredients.slice(id + 1))
        console.log("newIngredients=", newIngredients)
        setIngredients(newIngredients)
        console.log(id, " deleted")
    }

    function submit() {
        const req = { "_id": _id, "dish": _dish, "ingredients": _ingredients, "preparation": _preparation, "prepTime": _prepTime, "author": _author, "veg": _veg }
        if (auth === "unauthorized") {
            suggestEdit(req)
            showEditReqSuccessToastMessage()
        }
        else if (auth === "authorized") {
            submitEdit(req)
        }
    }

    async function suggestEdit(req) {
        console.log("suggesting edit", req)
        const response = await fetch("https://recipe-finder24.herokuapp.com/api/edit-request", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        })
        await response.json().then((data) => {
            console.log(data)
        })
    }

    async function submitEdit(req) {
        console.log("editing recipe", req)
        let token = localStorage.getItem("token")
        const response = await fetch("https://recipe-finder24.herokuapp.com/api/admin/edit-recipe", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization': "Bearer " + token
            },
            body: JSON.stringify(req)
        })
        await response.json().then((data) => {
            console.log("edited",data)
            window.location.reload()
        })

    }

    return (
        <div className="modal fade" id={"editRecipeModal" + _id} tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 id={"editRecipeModalTitle" + _id} className="modal-title w-100">
                            <div className="title p-0">
                                {dish}
                                {veg ?
                                    <span className="badge ml-2" style={{ backgroundColor: "#3a8925" }}>Veg</span>
                                    : <span className="badge ml-2" style={{ backgroundColor: "#C7181B" }}>Non-Veg</span>}
                            </div>

                        </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="list-group list-group-flush">

                                {(auth !== "authorized") && <div className="form-group ">
                                    <p className='text-muted'>Author:</p>
                                    <div>
                                        <input value={_author} className="form-control w-100" onChange={(e) => { handleAuthor(e) }}></input>
                                    </div>
                                </div>}
                                {(auth === "authorized") && <div className="form-group ">
                                    <p className='text-muted'>Title</p>
                                    <div>
                                        <input value={_dish} className="form-control w-100" onChange={(e) => { handleDish(e) }}></input>
                                    </div>
                                </div>}


                                <div className="form-group ">
                                    <div className='mt-2 d-flex justify-content-center'>
                                        <div className="d-inline">
                                            <input id="veg" className="radio mr-1" type="radio" name="food_type" checked={_veg} onClick={(e) => { handleVeg(e) }} value="veg" />
                                            <label className="radio-inline" htmlFor="veg">
                                                Veg
                                            </label>
                                        </div>
                                        <div className="ml-5 d-inline">
                                            <input id="non_veg" className="radio mr-1" type="radio" name="food_type" checked={!_veg} onClick={(e) => { handleVeg(e) }} value="non_veg" />
                                            <label className="radio-inline" htmlFor="non_veg">
                                                Non-Veg
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group ">
                                    <p className="text-muted">Ingredients:</p>

                                    <div className="row mb-3">
                                        <div className="col">

                                            {_ingredients.length > 0 &&
                                                _ingredients.map((ingredient, id) => (
                                                    <div key={id} className="badge rounded-pill bg-warning py-1 px-2 text-dark mr-1 mb-1">
                                                        <div className="d-flex align-items-center">
                                                            <div className="text-dark fa fa-close p-1 mr-1 close fs-6" onClick={() => { removeIngredient(id) }}></div>
                                                            <span>{ingredient}</span>
                                                        </div>
                                                    </div>
                                                ))
                                            }

                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-10 col-12">
                                            <MDBInput id="ingredientsInput" className="form-control" onChange={(e) => { handleIngredient(e) }} placeholder="Enter an ingredient then click Add or hit Enter" onKeyDown={(e) => { addIngredient(e) }} wrapperClass='mb-4' value={ingredient} />
                                        </div>
                                        <div className="col-md-2 col-8 mx-auto mb-4">
                                            <div className="btn btn-warning text-dark" onClick={(e) => { addIngredient(e) }}>Add</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group ">
                                    <p className='text-muted'>Preparation Time:</p>
                                    <div>
                                        <input value={_prepTime} onChange={(e) => { handlePrepTime(e) }} className="form-control w-100"></input>
                                    </div>
                                </div>
                                <div className="Preparation ">
                                    <p className='text-muted'>Preparation Procedure:</p>
                                    <textarea value={_preparation} onChange={(e) => { handlePreparation(e) }} className="form-control w-100" rows={8} />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <span className='mr-auto text-muted'>
                            Last edited on
                            <span className='font-italic'> {lastEdited} </span>
                        </span>
                        <button type="button" className="btn btn-dark darkgreen" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-warning text-dark darkgreen" data-dismiss="modal" onClick={() => { submit() }}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
