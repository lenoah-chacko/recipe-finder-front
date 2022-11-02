import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchByIngredients() {
    const navigate= useNavigate()
    const [ingredients,setIngredients]=useState([])

    const [ingredient,setIngredient]=useState("")

    function addIngredient(e){
        e.preventDefault()
        console.log("event",e.type,"key",e.key)
        if(e.type==="click" || (e.type==="keydown" && e.key === 'Enter'))
        {
            setIngredients([...ingredients,ingredient])
            setForm({...form,"ingredients":ingredients})
            setIngredient("")
        }
    }
    function removeIngredient(id){     
        const newIngredients=ingredients.slice(0,id).concat(ingredients.slice(id+1))
        setIngredients(newIngredients); // 2nd parameter means remove one item only
        console.log(id," deleted")
        setForm({...form,"ingredients":newIngredients})
    }

    const [form,setForm]=useState({"ingredients":[],"matchcase":false,"matchword":false})
    function handleIngredient(e){
        console.log(e)
        setIngredient(e.target.value)
    }
    function handleCase(e){
        console.log(e)
        setForm({...form,"matchcase":e.target.checked})
    }
    function handleWord(e){
        console.log(e)
        setForm({...form,"matchword":e.target.checked})
    }
    function handleSearch(e){
        e.preventDefault()
        console.log("gonna search",form)
        var ingredientString=""
        for (let ind = 0; ind < ingredients.length; ind++) {
            const ingredient = ingredients[ind];
            ingredientString=ingredientString.concat(`ingredient${ind}=${ingredient}&`)
        }
        console.log("ingredientString",ingredientString)
        navigate(`/search/ingredients?${ingredientString}matchcase=${form.matchcase}&matchword=${form.matchword}`)
    }
  return (
        <form>
            <div className="row">
                <div className="col-12 mb-3">
                    <div className="search">

                        <div className="row mb-3">
                            <div className="col">
{/* fix alignment buha */}
                            {ingredients.length>0&&
                                                    ingredients.map((ingredient,id)=>(
                                                                                    <div key={id} className="badge rounded-pill bg-warning py-1 px-2 text-dark mr-1 mb-1">
                                                                                        <div className="d-flex align-items-center">
                                                                                        <div className="text-dark fa fa-close p-1 mr-1 close fs-6" onClick={()=>{removeIngredient(id)}}></div>
                                                                                        <span>{ingredient}</span>
                                                                                        </div>
                                                                                    </div>
                                                    ))
                            }

                            </div>
                        </div>

                        <i className="fa fa-search"></i>                        
                        <input type="text" className="form-control" onChange={(e)=>handleIngredient(e)} placeholder="Enter an ingredient to search by and click Add or hit Enter" value={ingredient}/>
                        <button className="btn btn-warning" onClick={(e)=>{addIngredient(e)}}>Add</button>
                    </div>
                </div>
                <div className="col d-flex justify-content-center">
                    <div className="btn btn-warning w-75" onClick={(e)=>handleSearch(e)}>Search</div>
                </div>
            </div>
            <div className="d-flex mt-3 text-center">
                <div className="col text-right">
                    <div className="form-check form-check-inline">                        
                        <input className="form-check-input" onChange={(e)=>handleCase(e)} type="checkbox" value="" id="defaultCheck1"/>
                        <label className="form-check-label" htmlFor="defaultCheck1">
                            Match Case
                        </label>
                    </div>
                </div>
                <div className='col text-left'>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" onChange={(e)=>handleWord(e)} type="checkbox" value="" id="defaultCheck2"/>
                        <label className="form-check-label" htmlFor="defaultCheck2">
                            Match Word
                        </label>
                    </div>
                </div>
            </div>
        </form>
  )
}
