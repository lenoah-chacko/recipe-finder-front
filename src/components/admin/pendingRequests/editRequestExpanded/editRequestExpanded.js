import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import RecipeList from '../../../common/recipeList/recipeList'

export default function EditRequestExpanded() {
    const navigate=useNavigate()
    const {id} = useParams()
    const [recipe, setRecipe] = useState({ "_id": "", "dish": "", "ingredients": [], "preparation": "", "edits": [], "author": "", "lastEdited": "", "veg": "" ,"prepTime":""})
    const [recipes, setRecipes] = useState([])
    useEffect(()=>{
        console.log(id)
        seeEdits(id)
        getRecipe(id)
    },[])

    function removeEditRecipe(_id){
        console.log("removeEditRecipe",_id)
        setRecipes(recipes.filter((recipe)=>{return recipe._id!==_id}))
    }

    async function getRecipe(id) {
        var request = { "_id": id }
        const response = await fetch("https://recipe-finder24.herokuapp.com/api/get-recipe", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        })
        await response.json().then((data) => {
            // setRecipe(data)
            //push to another page
            console.log("recieved", data)
            setRecipe(data)
        }).catch((error) => {
            // Your error is here!
            console.log("err", error)
        });
    }

    async function seeEdits(_id) {
        var request = { "_id": _id }
        let token = localStorage.getItem("token")
        const response = await fetch("https://recipe-finder24.herokuapp.com/api/admin/get-recipe-edits", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': "Bearer " + token
            },
            body: JSON.stringify(request)
        })
        await response.json().then((data) => {
            setRecipes(data)
            //push to another page
            console.log("recieved", data)
        }).catch((error) => {
            // Your error is here!
            console.log("err", error)
        });
    }
  return (
    <div>
        <div id="allRecipes" className="jumbotron">
          <div className="px-5">
            
            <div className="row">
                <div className="col-12 col-lg-6">
                    <h1 className="display-4 row">
                        <div className="back">
                        <div className="btn btn-warning p-1 back fs-2" onClick={()=>{navigate(-1)}}>
                            <i className='fa fa-arrow-left'></i>
                        </div>
                        </div>
                        <div className='col d-block'>{recipe.dish}</div>
                    </h1>
                    <p className="lead">Last edited by {recipe.author} on {recipe.lastEdited}</p>
                    <hr className='my-4' style={{background: 'gray',height: '3px'}}/>          
                    <div className="lead">
                            <div className='d-inline-block'>
                                    <div className='row'>
                                        <div className="col">
                                            <h1 className="fs-3">Ingredients</h1>
                                        </div>                                            
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className=" d-flex flex-wrap">
                                            {recipe.ingredients.length > 0 ?
                                                recipe.ingredients.map((ingredient, i) => (
                                                        <span key={i} className="badge bg-warning text-dark ml-1 text-wrap mt-1">{ingredient}</span>
                                                    ))                                            
                                                : "None specified"
                                            }
                                            </div>
                                        </div>
                                    </div>
                            </div>
                    </div>
                </div>
                <div className="col-12 col-lg-6">
                    <hr className='my-4 d-block d-lg-none' style={{background: 'gray',height: '3px'}}/>
                    <div>
                        <h1 className="fs-3">Time to prepare</h1>
                        {recipe.prepTime}
                    </div>
                    <hr className='my-4 d-block d-lg-none' style={{background: 'gray',height: '3px'}}/>
                    <div>
                        <h1 className="fs-3 mt-4">Steps for preparation</h1>
                        {recipe.preparation}
                    </div>
                </div>
              
            </div>
          </div>
        </div>
        {/* <div className="btn btn-warning" onClick={()=>{removeEditRecipe("635e5051a358ce59d5e7ac59")}}>check</div> */}
        <div className='container-fluid'>
            <RecipeList recipes={recipes} removeEditRecipe={removeEditRecipe} originalRecipe={recipe} type={"editsOnly"}></RecipeList>
        </div>
        
    </div>
  )
}
