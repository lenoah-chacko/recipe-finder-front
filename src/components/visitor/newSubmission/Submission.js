import React from 'react'
import './Submission.css'
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBTextArea } from 'mdb-react-ui-kit';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Submission() {
    const [showIngredientsWarning,setShowIngredientsWarning]=useState(false)
    const [ingredients,setIngredients]=useState([])

    
    const [author,setAuthor]=useState("")
    const [showAuthorWarning,setShowAuthorWarning]=useState(false)
    function handleAuthor(e){
        setAuthor(e.target.value)
        console.log(e)
        setShowAuthorWarning(false)
    }
    const [title,setTitle]=useState("")
    const [showTitleWarning,setShowTitleWarning]=useState(false)
    function handleTitle(e){
        setTitle(e.target.value)
        console.log(e)
        setShowTitleWarning(false)
    }
    const [preparation,setPreparation]=useState("")
    const [showPreparationWarning,setShowPreparationWarning]=useState(false)
    function handlePreparation(e){
        setPreparation(e.target.value)
        console.log(e)
        setShowPreparationWarning(false)
    }
    const [ingredient,setIngredient]=useState("")
    function handleIngredient(e){
        setIngredient(e.target.value)
        console.log(e)
    }
    const [prepTime,setPrepTime]=useState("")
    const [showPrepTimeWarning,setShowPrepTimeWarning]=useState(false)
    function handlePrepTime(e){
        setPrepTime(e.target.value)
        console.log(e)
        setShowPrepTimeWarning(false)
    }

    function addIngredient(e){    
        console.log("event",e.type,"key",e.key)
        if(e.type==="click" || (e.type==="keydown" && e.key === 'Enter'))
        {
            setIngredients([...ingredients,ingredient])
            setIngredient("")
            setShowIngredientsWarning(false)
        }
    }
    
    function removeIngredient(id){     
        setIngredients(ingredients.slice(0,id).concat(ingredients.slice(id+1))); // 2nd parameter means remove one item only
        console.log(id," deleted")
    }

    function submit(){
        if(title==='' || author==='' || ingredients.length===0 || preparation==='' || prepTime==='')
        {
            setShowTitleWarning(true)
            setShowAuthorWarning(true)
            setShowIngredientsWarning(true)
            setShowPreparationWarning(true)
            setShowPrepTimeWarning(true)
            return
        }else{
            setShowTitleWarning(false)
            setShowAuthorWarning(false)
            setShowIngredientsWarning(false)
            setShowPreparationWarning(false)
            setShowPrepTimeWarning(false)
        }
        addRecipe({
            "dish":title,
            "author":author,
            "ingredients":ingredients,
            "preparation":preparation,
            "veg":true,
            "prepTime":prepTime
        })
        setAuthor("")
        setIngredients([])
        setIngredient("")
        setTitle("")
        setPreparation("")
        setPrepTime("")
    }
    async function addRecipe(req){
        console.log("adding",req)
        const response = await fetch("https://recipe-finder24.herokuapp.com/api/add-request",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        })
        await response.json().then((data)=>{
            showToastMessage()
        }).catch((err)=>{
            console.log(err)
        })
    }
    function showToastMessage(){
        console.log("success")
        toast.success('Recipe request submitted successfully!', {
            position: toast.POSITION.TOP_RIGHT
        });
    };
      
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
                            <div className="mt-2 mt-4 fw-bold">Author</div>
                            <MDBInput value={author} id="authorInput" onChange={(e)=>{handleAuthor(e)}} placeholder="Your name" wrapperClass='mt-4' type='author' size="lg"/>
                            {(author === '' && showAuthorWarning) && <span className="text-danger">Please enter a valid name</span>}
                            <div className="mt-2 fw-bold">Title</div>
                            <MDBInput value={title} id="titleInput" onChange={(e)=>{handleTitle(e)}} placeholder="Dish's name" wrapperClass='mt-4' type='title' size="lg"/>
                            {(title === '' && showTitleWarning) && <span className="text-danger">Please enter a valid Title</span>}
                            <div className='mt-2 mx-auto'>
                                <div className="d-inline">
                                    <input className="radio mr-1" type="radio" id="veg" name="food_type" value="veg" checked />
                                    <label className="radio-inline" htmlFor="veg">
                                        Veg
                                    </label>
                                </div>
                                <div className="ml-5 d-inline">
                                    <input className="radio mr-1" type="radio" id="nonveg" name="food_type" value="non_veg" />
                                    <label className="radio-inline" htmlFor="nonveg">
                                        Non-Veg
                                    </label>
                                </div>
                            </div>
                            <div className="mt-2 fw-bold">Ingredients</div>

                            <div className="row mt-3">
                                <div className="col">

                                {ingredients.length>0&&
                                                        ingredients.map((ingredient,id)=>(
                                                                                        <div key={id} className="badge rounded-pill bg-warning py-1 px-2 text-dark mr-1 mt-1">
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
                                <MDBInput value={ingredient} id="ingredientsInput" onChange={(e)=>{handleIngredient(e)}} placeholder="Enter an ingredient then click Add or hit Enter" onKeyDown={(e)=>{addIngredient(e)}} wrapperClass='mt-4'/>
                                </div>
                                <div className="col-md-2 col-8 mx-auto mt-4">
                                    <div className="btn btn-warning text-dark w-100" onClick={(e)=>{addIngredient(e)}}>Add</div>
                                </div>
                            </div>
                            {(ingredients.length===0 && showIngredientsWarning) && <span className="text-danger">Please enter some ingredients</span>}

                            <div className="mt-2 fw-bold">Preparation Time</div>
                            <MDBInput value={prepTime}  id="prepTimeInput" onChange={(e)=>{handlePrepTime(e)}} placeholder="Time it would take to prepare the dish" type='title' size="lg"/>
                            {(prepTime === '' && showPrepTimeWarning) && <span className="text-danger">Please enter a valid duration</span>}
                            <div className="mt-2 mt-4 fw-bold">Preparation</div>
                            <MDBTextArea value={preparation} rows={3} id="preparationInput" placeholder="Steps to prepare the dish" onChange={(e)=>{handlePreparation(e)}} />
                            {(preparation === '' && showPreparationWarning) && <span className="text-danger">Please enter a valid procedure</span>}
                            <div className='d-flex flex-row mt-2'></div>
                            <div className="row">
                                <div className="col-10 mx-auto">
                                    <div className="text-center">
                                        <MDBBtn className="mt-4 px-4 w-100" color='warning text-dark' onClick={()=>{submit()}}>
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
        <ToastContainer />
        </>
  )
}
