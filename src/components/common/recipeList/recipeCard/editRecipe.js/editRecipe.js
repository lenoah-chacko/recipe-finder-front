import React, { useEffect } from 'react'
import '../expandedRecipe/expandedRecipe.css'
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import { useState } from 'react';

export default function EditRecipe({_id, author, dish, ingredients, lastEdited, preparation, prepTime, veg}) {
    const [newRecipe,setNewRecipe]=useState({"_id":_id, "dish":dish, "ingredients":ingredients ,"preparation":prepTime ,"edits":lastEdited ,"author":author , "status":veg})
    const [ingredient,setIngredient]=useState("")
    const [_author,setAuthor]=useState(author)
    const [_ingredients,setIngredients]=useState(ingredients)
    const [_preparation,setPreparation]=useState(preparation)
    const [_prepTime,setPrepTime]=useState(prepTime)
    const [_veg,setVeg]=useState(veg)

    function handleAuthor(e){
        console.log(e.target.value)
        setAuthor(e.target.value)
    }

    function handleIngredients(e){
        setIngredients(e.target.value)
    }

    function handlePreparation(e){
        console.log(e.target.value)
        setPreparation(e.target.value)
    }

    function handlePrepTime(e){
        console.log(e.target.value)
        setPrepTime(e.target.value)
    }

    function handleVeg(e){
        setVeg(e.target.value==="veg")
    }

    function handleIngredient(e){
        setIngredient(e.target.value)
        console.log(e)
    }
    function addIngredient(e){    
        console.log("event",e.type,"key",e.key)
        if(e.type=="click" || e.type=="keydown" && e.key == 'Enter')
        {
            handleIngredients([...ingredients,ingredient])
            setIngredient("")
        }
    }

    function removeIngredient(id){     
        console.log("id=",id)
        const newIngredients=_ingredients.slice(0,id).concat(_ingredients.slice(id+1))
        console.log("newIngredients=",newIngredients)
        setIngredients(newIngredients)
        console.log(id," deleted")
    }

    function submit(){
        const req = {"_id":_id, "dish":dish, "ingredients":_ingredients ,"preparation":_prepTime ,"author":_author , "veg":_veg}
        suggestEdit(req)
    }
    
    async function suggestEdit(req){
        console.log("suggesting edit",req)
        const response = await fetch("http://localhost:4000/api/edit-request",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        })
        const data=await response.json().then((data)=>{
            console.log(data)
        })  
    }
  
    return (
    <div className="modal fade" id={"editRecipeModal"+_id} tabIndex="-1" role="dialog" aria-labelledby={"editRecipeModal"+_id} aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 id={"editRecipeModal"+_id} className="modal-title w-100">
                    <div className="title p-0">
                        {dish}
                            {veg?
                                <span className="badge ml-2" style={{backgroundColor:"#3a8925"}}>Veg</span>
                                :<span className="badge ml-2" style={{backgroundColor:"#C7181B"}}>Non-Veg</span>}
                    </div>
                    
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <form>
                    <div className="list-group list-group-flush">

                        <div className="form-group ">
                            <p className='text-muted'>Author:</p>
                            <div>
                                <input value={_author} className="form-control w-100" onChange={(e)=>{handleAuthor(e)}}></input> 
                            </div>
                        </div>
                        <div className="form-group ">
                            <div className='mt-2 d-flex justify-content-center'>
                                <div className="d-inline">
                                    <input id="veg" className="radio mr-1" type="radio" name="food_type" checked={_veg} onClick={(e)=>{handleVeg(e)}} value="veg" />
                                    <label className="radio-inline" htmlFor="veg">
                                        Veg
                                    </label>
                                </div>
                                <div className="ml-5 d-inline">
                                    <input id="non_veg" className="radio mr-1" type="radio" name="food_type" checked={!_veg} onClick={(e)=>{handleVeg(e)}} value="non_veg" />
                                    <label className="radio-inline" htmlFor="non_veg">
                                        Non-Veg
                                    </label>
                                </div>
                            </div>
                            </div>
                            <div className="form-group ">
                                <p className="text-muted">Ingredients:</p>
                                
                                <div className="row mb-3">
                                    <div className="col">

                                    {_ingredients.length>0&&
                                                            _ingredients.map((ingredient,id)=>(
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

                                <div className="row">
                                        <div className="col-md-10 col-12">
                                        <MDBInput id="ingredientsInput" className="form-control" onChange={(e)=>{handleIngredient(e)}} placeholder="Enter an ingredient then click Add or hit Enter" onKeyDown={(e)=>{addIngredient(e)}} wrapperClass='mb-4' value={ingredient}/>
                                        </div>
                                        <div className="col-md-2 col-8 mx-auto mb-4">
                                            <div className="btn btn-warning" onClick={(e)=>{addIngredient(e)}}>Add</div>
                                        </div>
                                </div>
                        </div>
                        <div className="form-group ">
                            <p className='text-muted'>Preparation Time:</p>
                            <div>
                                <input value={_prepTime} onChange={(e)=>{handlePrepTime(e)}}  className="form-control w-100"></input> 
                            </div>
                        </div>
                        <div className="Preparation ">
                            <p className='text-muted'>Preparation Procedure:</p>
                            <textarea value={_preparation} onChange={(e)=>{handlePreparation(e)}}  className="form-control w-100" rows={8} />
                        </div>
                    </div>
                </form>
            </div>
            <div className="modal-footer">
                <span className='mr-auto text-muted'>
                    Last edited on
                    <span className='font-italic'> {lastEdited} </span>
                </span>
                <button type="button" className="btn btn-dark darkgreen" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-warning darkgreen" data-dismiss="modal" onClick={()=>{submit()}}>Submit</button>
                {/* <button type="button" className="btn btn-warning" data-dismiss="modal" data-toggle="modal" data-target={"#editRecipeModal"+_id}>Suggest an Edit</button> */}
            </div>
            </div>
        </div>
        </div>
  )
}
