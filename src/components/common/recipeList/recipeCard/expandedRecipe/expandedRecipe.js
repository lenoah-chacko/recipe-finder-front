import React, { useEffect } from 'react'
import EditRecipe from '../editRecipe.js/editRecipe'
import './expandedRecipe.css'
export default function ExpandedRecipe({_id, author, dish, ingredients, lastEdited, preparation, prepTime, veg, type}) {
  return (
    <>
        <div className="modal fade" id={"recipeModal"+_id} tabIndex="-1" role="dialog" aria-labelledby={"recipeModalLabel"+_id} aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 id={"recipeModalLabel"+_id} className="modal-title w-100">
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
                            <div className="form-group list-group-item">
                                <p className="text-muted">Ingredients:</p>
                                <div className="row d-flex align-items-center">
                                    <div className="col">
                                    {ingredients.length>0?
                                                            ingredients.map((ingredient,i)=>(
                                                                <span key={i} className="badge badge-warning darkgreen ml-1 text-wrap">{ingredient}</span>
                                                            ))
                                                            :"None specified"
                                    }
                                    </div>                    
                                </div>
                            </div>
                            <div className="form-group list-group-item mt-1">
                                <p className='text-muted'>Preparation Time:</p>
                                <div>{prepTime}</div>
                            </div>
                            <div className="Preparation list-group-item mt-1">
                                <p className='text-muted'>Preparation Procedure:</p>
                                <div>{preparation}</div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <span className='mr-auto text-muted'>
                        Last edited by
                        <span className='font-italic'> {author} </span> 
                        on
                        <span className='font-italic'> {lastEdited} </span>
                    </span>
                    {(type=="all" || type=="search")&&<div>
                        <button type="button" className="btn btn-dark darkgreen" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-info" style={{backgroundColor:"#18A4C7"}} data-dismiss="modal" data-toggle="modal" data-target={"#editRecipeModal"+_id}>Suggest an Edit</button>
                    </div>}
                    {(type=="addRequest" || type=="editRequest")&&<div>
                        <button type="button" className="btn btn-secondary darkgreen mr-2" data-dismiss="modal">Accept</button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal" data-toggle="modal" data-target={"#editRecipeModal"+_id}>Reject</button>
                    </div>}
                    
                </div>
                </div>
            </div>
        </div>
        <EditRecipe _id={_id} author={author} dish={dish} ingredients={ingredients} lastEdited={lastEdited} preparation={preparation} prepTime={prepTime} veg={veg}></EditRecipe>
    </>
  )
}
