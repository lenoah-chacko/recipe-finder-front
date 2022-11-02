import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import RecipeList from '../../common/recipeList/recipeList'

export default function VisitorSearchResults() {
  const navigate=useNavigate()
  const location=useLocation()
  const [recipes,setRecipes]=useState([])
  const [form,setForm]=useSearchParams()
  useEffect(()=>{
      search({"dish":form.get("dish"),"matchcase":form.get("matchcase")=='true',"matchword":form.get("matchword")=='true'})
  },[form])

  async function search(req){
    console.log("search",req)
    const response = await fetch("http://localhost:4000/api/search-dish",{
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req)
    })
    await response.json().then((data)=>{
          setRecipes(data)
          console.log("recipes",data)
  })
}
  return (
    <div>
        <div id="foundRecipes" className="jumbotron">
          <div className="px-5">
              <h1 className="display-4 row">
                <div className="back">
                  <div className="btn btn-warning p-1 back fs-2" onClick={()=>{navigate('/find')}}>
                    <i className='fa fa-arrow-left'></i>
                  </div>
                </div>
                <div className='col d-block'>Recipes Found</div>
                
              </h1>

              <hr className='my-4' style={{background: 'gray',height: '3px'}}/>
              <div className="lead">
                Recipes with <span className='font-weight-bold'>"{form.get("dish")}"</span>
                <div className="row">
                  {form.get("matchcase")=="true"&&
                    <div className='col-12 text-muted fs-6'>
                      <i className='fa fa-check text-success mr-2'></i>
                      Matching Case
                    </div>
                  }
                  {form.get("matchword")=="true"&&
                    <div className='col-12 text-muted fs-6'>
                      <i className='fa fa-check text-success mr-2'></i>
                      Matching Word
                    </div>
                  }
                </div>
              </div>
          </div>
        </div>
        <div className='container-fluid'>
            <RecipeList recipes={recipes} search={true}></RecipeList>
        </div>
    </div>
  )
}
