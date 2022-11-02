import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import RecipeList from '../../../common/recipeList/recipeList'

export default function IngredientsSearchResults() {
  const navigate=useNavigate()
  const location=useLocation()
  const [recipes,setRecipes]=useState([])
  const [form,setForm]=useSearchParams()
  const [ingredients,setIngredients]=useState([])
  useEffect(()=>{
    var numOfIngredients=[...form.keys()].length-2;
    var ingredients=[]
    for (let ind = 0; ind < numOfIngredients; ind++) {
      const ingredient = ingredients.push(form.get('ingredient'+ind));
    }
    setIngredients(ingredients);
      search({"ingredients":ingredients,"matchcase":form.get("matchcase")==='true',"matchword":form.get("matchword")==='true'})
  },[form])

  async function search(req){
    console.log("search",req)
    const response = await fetch("http://localhost:4000/api/search-ingredients",{
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
                  <div className="btn btn-warning p-1 back fs-2" onClick={()=>{navigate('/find',{ state:{"title":false}})}}>
                    <i className='fa fa-arrow-left'></i>
                  </div>
                </div>
                <div className='col d-block'>Recipes Found</div>
                
              </h1>

              <hr className='my-4' style={{background: 'gray',height: '3px'}}/>
              <div className="lead">
                Recipes with  {ingredients.length>0&&
                                                    ingredients.map((ingredient,id)=>(<span className='font-weight-bold'>"{ingredient}" {(id<ingredients.length-1)&&", "} </span> ))
                              }
                <div className="row">
                  {form.get("matchcase")==="true"&&
                    <div className='col-12 text-muted fs-6'>
                      <i className='fa fa-check text-success mr-2'></i>
                      Matching Case
                    </div>
                  }
                  {form.get("matchword")==="true"&&
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
