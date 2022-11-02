import React from 'react'
import './Submission.css'
import { MDBBtn, MDBRadio, MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBIcon, MDBInput, MDBTextArea } from 'mdb-react-ui-kit';
import { useState } from 'react';

export default function Submission() {
    const [ingredients,setIngredients]=useState([])

    
    const [author,setAuthor]=useState("")
    function handleAuthor(e){
        setAuthor(e.target.value)
        console.log(e)
    }
    const [title,setTitle]=useState("")
    function handleTitle(e){
        setTitle(e.target.value)
        console.log(e)
    }
    const [preparation,setPreparation]=useState("")
    function handlePreparation(e){
        setPreparation(e.target.value)
        console.log(e)
    }
    const [ingredient,setIngredient]=useState("")
    function handleIngredient(e){
        setIngredient(e.target.value)
        console.log(e)
    }
    const [prepTime,setPrepTime]=useState("")
    function handlePrepTime(e){
        setPrepTime(e.target.value)
        console.log(e)
    }

    function addIngredient(e){    
        console.log("event",e.type,"key",e.key)
        if(e.type=="click" || e.type=="keydown" && e.key == 'Enter')
        {
            setIngredients([...ingredients,ingredient])
            setIngredient("")
        }
    }
    function removeIngredient(id){     
        setIngredients(ingredients.slice(0,id).concat(ingredients.slice(id+1))); // 2nd parameter means remove one item only
        console.log(id," deleted")
    }

    function submit(){
        addRecipe({
            "dish":title,
            "ingredients":ingredients,
            "preparation":preparation,
            "veg":true,
            "prepTime":prepTime
        })
    }
    async function addRecipe(req){
        console.log("adding",req)
        const response = await fetch("http://localhost:4000/api/add-request",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        })
        const data=await response.json()
    }
      
  return (
    <>
    <div className='container-fluid bg d-flex flex-grow-1 flex-column'>
        <div className="row">
            <div className="col-12 col-lg-6">
                <div className="image d-none d-lg-block"></div>
            </div>
            <div className="col-12 col-lg-6 p-3">
                <MDBContainer className='mt-5'>
                            <MDBCard className='mt-5'>
                            <MDBCardBody className='d-flex flex-column'>
                            <div className="d-flex flex-row mt-3"></div>
                            <div className="fs-3 fw-lighter text-center">Add a Recipe</div>                           
                            <div className="mb-2 mt-4 fw-bold">Author</div>
                            <MDBInput id="authorInput" onChange={(e)=>{handleAuthor(e)}} placeholder="Your name" wrapperClass='mb-4' type='author' size="lg"/>
                            <div className="mb-2 fw-bold">Title</div>
                            <MDBInput id="titleInput" onChange={(e)=>{handleTitle(e)}} placeholder="Dish's name" wrapperClass='mb-4' type='title' size="lg"/>
                            <div className='mb-2 mx-auto'>
                                <div className="d-inline">
                                    <input className="radio mr-1" type="radio" name="food_type" value="veg" checked />
                                    <label className="radio-inline" htmlFor="flexRadioDefault1">
                                        Veg
                                    </label>
                                </div>
                                <div className="ml-5 d-inline">
                                    <input className="radio mr-1" type="radio" name="food_type" value="non_veg" />
                                    <label className="radio-inline" htmlFor="flexRadioDefault2">
                                        Non-Veg
                                    </label>
                                </div>
                            </div>
                            <div className="mb-2 fw-bold">Ingredients</div>

                            <div className="row mb-3">
                                <div className="col">

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
                            <div className="row">
                                <div className="col-md-10 col-12">
                                <MDBInput id="ingredientsInput" onChange={(e)=>{handleIngredient(e)}} placeholder="Enter an ingredient then click Add or hit Enter" onKeyDown={(e)=>{addIngredient(e)}} wrapperClass='mb-4' value={ingredient}/>
                                </div>
                                <div className="col-md-2 col-8 mx-auto mb-4">
                                    <div className="btn btn-warning w-100" onClick={(e)=>{addIngredient(e)}}>Add</div>
                                </div>
                            </div>
                            <div className="mb-2 fw-bold">Preparation Time</div>
                            <MDBInput id="prepTimeInput" onChange={(e)=>{handlePrepTime(e)}} placeholder="Time it would take to prepare the dish" type='title' size="lg"/>
                            <div className="mb-2 mt-4 fw-bold">Preparation</div>
                            <MDBTextArea rows={3} id="preparationInput" placeholder="Steps to prepare the dish" onChange={(e)=>{handlePreparation(e)}} />
                            <div className='d-flex flex-row mt-2'></div>
                            <div className="row">
                                <div className="col-10 mx-auto">
                                    <div className="text-center">
                                        <MDBBtn className="mt-4 px-4 w-100" color='warning' onClick={()=>{submit()}}>
                                            Submit
                                        </MDBBtn>
                                        </div>
                                </div>
                            </div>
                            </MDBCardBody>
                    </MDBCard>
                </MDBContainer>
            </div>
        </div>
        </div>
        </>
  )
}
