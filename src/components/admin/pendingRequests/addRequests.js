import React from 'react'
import RecipeList from '../../common/recipeList/recipeList'
import '../../common/allRecipes/allRecipes.css'
import { useState, useEffect } from 'react'
import AuthHeader from '../authServices/authHeader'
import axios from "axios";
import { useNavigate } from 'react-router-dom'

export default function AddRequests() {
    const [recipes, setRecipes] = useState([])
    const navigate = useNavigate()

    function removeAddRecipe(_id) {
        console.log("removeAddRecipe", _id)
        setRecipes(recipes.filter((recipe) => { return recipe._id !== _id }))
    }

    function acceptAddRecipe(_id) {
        console.log("removeAddRecipe", _id)
        setRecipes(recipes.filter((recipe) => { return recipe._id !== _id }))
    }

    async function getAddRequests() {
        let token=localStorage.getItem("token")
        const response = await fetch("https://recipe-finder24.herokuapp.com/api/admin/get-add-requests", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization': "Bearer "+token
            },
        })
        const data = await response.json()
        setRecipes(data)
    }

    useEffect(() => {
        async function asyncEffect() {
            await getAddRequests()
        }
        asyncEffect()
    }, [])
    
    return (
        <div>
            <div id="addRequests" className="jumbotron">
                <div className="px-5">
                    <h1 className="display-4 row">
                        <div className="back">
                        <div className="btn btn-warning p-1 back fs-2" onClick={()=>{navigate(-1)}}>
                            <i className='fa fa-arrow-left'></i>
                        </div>
                        </div>
                        <div className='col d-block'>Recipe Submissions</div>
                        
                    </h1>
                    <p className="lead">List of all recipe submissions from users</p>
                    <hr className='my-4' style={{ background: 'gray', height: '3px' }} />
                </div>
            </div>
            <div className='container-fluid'>
                <RecipeList removeAddRecipe={removeAddRecipe}
                    recipes={recipes}
                    type={"addRequest"} />
            </div>
        </div>
    )
}
