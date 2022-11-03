import React from 'react'
import RecipeList from '../../common/recipeList/recipeList'
import '../../common/allRecipes/allRecipes.css'
import { useState,useEffect } from 'react'

export default function EditRequests() {
  const [recipes,setRecipes]=useState([])

  async function getEditRequests(){
    const response = await fetch("http://localhost:4000/api/admin/get-edit-requests", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
    })
    await response.json().then((data) => {
      setRecipes(data)
      console.log("recieved", data)
  }).catch((error) => {
      // Your error is here!
      console.log("err", error)
  });
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
