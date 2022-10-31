import { useEffect } from 'react';
import { useState } from 'react';
import './recipeCard.css'

export default function RecipeCard({id, author, dish, ingredients, lastEdited, preparation}){
    const [ingredientCutoff,setIngredientCutoff]=useState(4)
    useEffect(()=>{
        function handleResize() {
            const width=window.innerWidth
            console.log("width=",width)
            if (width<1300 && width>800){
                setIngredientCutoff(4)
                console.log("Cutoff set to 4")
            }
            else if(width<800 && width>600){
                setIngredientCutoff(3)
                console.log("Cutoff set to 3")
            }
            else if(width<600){
                setIngredientCutoff(2)
                console.log("Cutoff set to 2")
            }
            else{
                setIngredientCutoff(5)
                console.log("Cutoff set to 5")
            }
          
      }
        window.addEventListener('resize', handleResize)
    },[])
  return (
    <div>
        <div className="card text-center">
            <div className="tag">Veg</div>
            <div className="card-body d-flex flex-column align-items-center">
                <div className="list-group list-group-flush title">
                    <h5 className="card-title w-100 d-flex justify-content-center align-items-center">
                        <span className='title'>
                            {dish}
                        </span>
                    </h5>
                    
                    <div className="list-group-item">
                    <div className='row'>
                        <div className="col">Ingredients</div>
                    </div>
                    <div className="row d-flex align-items-center">
                        <div className="col">
                        {ingredients.length>0?
                                                ingredients.length<ingredientCutoff?
                                                                            ingredients.map((ingredient,i)=>(
                                                                                <span key={i} className="badge badge-secondary darkgreen ml-1 text-wrap">{ingredient}</span>
                                                                            ))
                                                                            : ingredients.slice(0, ingredientCutoff).map((ingredient,i) => (
                                                                                <span key={i} className="badge badge-secondary darkgreen ml-1 text-wrap">{ingredient}</span>
                                                                            )) 
                                                :"None specified"
                        }
                        {ingredients.length>ingredientCutoff && <span className="badge badge-secondary darkgreen ml-1">+{ingredients.length-ingredientCutoff} more</span>}
                        {}
                        </div>                    
                    </div>
                    
                    </div>
                    <div className="list-group-item mt-1 card-text">
                        <div className="preparation">
                            {preparation}
                        </div>
                        <div className='btn btn-dark darksgreen mt-3'>Read more</div>
                    </div>
                </div>
            </div>
            <div className="card-footer text-muted">
                Updated on {lastEdited} by {author}
            </div>
        </div>
    </div>
  )
}
