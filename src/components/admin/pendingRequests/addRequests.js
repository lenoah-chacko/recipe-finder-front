import React from 'react'
import RecipeList from '../../common/recipeList/recipeList'
import '../../common/allRecipes/allRecipes.css'
import { useState, useEffect } from 'react'

export default function AddRequests() {
    const [recipes, setRecipes] = useState([])
    async function getAddRequests() {
        const response = await fetch("http://localhost:4000/api/admin/get-add-requests", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        setRecipes(data)
    }

    useEffect(() => {
        getAddRequests()
    }, [])

    return (
        <div>
            <div id="addRequests" className="jumbotron">
                <div className="px-5">
                    <h1 className="display-4">Recipe Submissions</h1>
                    <p className="lead">List of all recipe submissions from users</p>
                    <hr className='my-4' style={{ background: 'gray', height: '3px' }} />
                </div>
            </div>
            <div className='container-fluid'>
                <RecipeList recipes={recipes} type={"addRequest"}></RecipeList>
            </div>
        </div>
    )
}
