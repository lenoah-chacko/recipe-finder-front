import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import RecipeList from '../../common/recipeList/recipeList'

export default function AdminTitleSearchResults() {
  const navigate=useNavigate()
  const [recipes,setRecipes]=useState([])
  const [searchParams,setSearchParams]=useSearchParams()
  useEffect(()=>{
      search({"dish":searchParams.get("dish"),"matchcase":searchParams.get("matchcase")==='true',"matchword":searchParams.get("matchword")==='true'})
  },[searchParams])

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
                Recipes with <span className='font-weight-bold'>"{searchParams.get("dish")}"</span>
                <div className="row">
                  {searchParams.get("matchcase")==="true"&&
                    <div className='col-12 text-muted fs-6'>
                      <i className='fa fa-check text-success mr-2'></i>
                      Matching Case
                    </div>
                  }
                  {searchParams.get("matchword")==="true"&&
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
            <RecipeList recipes={recipes} type={"search"}></RecipeList>
        </div>
    </div>
  )
}
