import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import RecipeList from '../../common/recipeList/recipeList'

export default function AdminTitleSearchResults({auth}) {
  const navigate=useNavigate()
  const [recipes,setRecipes]=useState([])
  const [searchParams,setSearchParams]=useSearchParams()
  const [currentPage,setCurrentPage]=useState(0)
  useEffect(()=>{
      search({"dish":searchParams.get("dish"),"matchcase":searchParams.get("matchcase")==='true',"matchword":searchParams.get("matchword")==='true',"page":currentPage})
  },[searchParams,currentPage])

  async function search(req){
    console.log("search",req)
    const response = await fetch("https://recipe-finder24.herokuapp.com/api/search-dish",{
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
function removeSearchRecipe(_id){
  console.log("removeSearchRecipe", _id)
  setRecipes(recipes.filter((recipe) => { return recipe._id !== _id }))
}
function prevPage(){
  console.log("trying")
  if(currentPage>0){
    console.log("decremented")
    setCurrentPage(currentPage-1)
  }
}
function nextPage(){
  console.log("trying")
  if(recipes.length>0){
    console.log("incremented")
    setCurrentPage(currentPage+1)
  }
}
  return (
    <div>
        <div id="foundRecipes" className="jumbotron">
          <div className="px-5">
              <h1 className="display-4 row">
                <div className="back">
                  <div className="btn btn-warning p-1 back fs-2" onClick={()=>{navigate(-1)}}>
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
            <nav className='d-flex justify-content-center' aria-label="Page navigation">
              <ul class="pagination">
                  <li class="page-item">
                  <a class="page-link" onClick={()=>{prevPage()}} aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                  </a>
                  </li>
                  <li class="page-item"><a class="page-link" >Page {currentPage+1}</a></li>
                  <li class="page-item">
                  <a class="page-link" onClick={()=>{nextPage()}} aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                  </a>
                  </li>
              </ul>
            </nav>
            <RecipeList auth={auth} removeSearchRecipe={removeSearchRecipe} recipes={recipes} type={"search"}></RecipeList>
        </div>
    </div>
  )
}
