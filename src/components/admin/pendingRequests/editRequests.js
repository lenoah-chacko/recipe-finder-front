import React from 'react'
import RecipeList from '../../common/recipeList/recipeList'
import '../../common/allRecipes/allRecipes.css'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function EditRequests() {
  const [recipes,setRecipes]=useState([])

  async function getEditRequests(){
    const response = await fetch("http://localhost:4000/api/admin/get-edit-requests", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
    })
    const data = await response.json()
    setRecipes(data)
}

  useEffect(()=>{
      getEditRequests()
  },[])

  return (
    <div>
        <div id="editRequests" className="jumbotron">
          <div className="px-5">
              <h1 className="display-4">Recipe Edit Submissions</h1>
              <p className="lead">List of all recipe edit requests from users</p>
              <hr className='my-4' style={{background: 'gray',height: '3px'}}/>
          </div>
        </div>
        <div className='container-fluid'>
            <RecipeList recipes={recipes} type={"editRequest"}></RecipeList>
        </div>
    </div>
  )
}
