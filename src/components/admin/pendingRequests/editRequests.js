import React from 'react'
import RecipeList from '../../common/recipeList/recipeList'
import '../../common/allRecipes/allRecipes.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function EditRequests() {
  const [recipes, setRecipes] = useState([])
  const navigate = useNavigate()

  async function getEditRequests() {
    let token = localStorage.getItem("token")
    const response = await fetch("https://recipe-finder24.herokuapp.com/api/admin/get-edit-requests", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'authorization': "Bearer " + token
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

  useEffect(() => {
    getEditRequests()
  }, [])

  return (
    <div>
      <div id="editRequests" className="jumbotron">
        <div className="px-5">
          <h1 className="display-4 row">
              <div className="back">
              <div className="btn btn-warning p-1 back fs-2" onClick={()=>{navigate(-1)}}>
                  <i className='fa fa-arrow-left'></i>
              </div>
              </div>
              <div className='col d-block'>Recipe Edit Submissions</div>
              
          </h1>
          <p className="lead">List of all recipe edit requests from users</p>
          <hr className='my-4' style={{ background: 'gray', height: '3px' }} />
        </div>
      </div>
      <div className='container-fluid'>
        <RecipeList recipes={recipes} type={"editRequest"}></RecipeList>
      </div>
    </div>
  )
}
