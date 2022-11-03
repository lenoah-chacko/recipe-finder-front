import React from 'react'
import RecipeList from '../recipeList/recipeList'
import './allRecipes.css'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function AllRecipes() {
  const [recipes,setRecipes]=useState([])
  useEffect(()=>{
      getRecipes()
      /* setRecipes([
          {
              "_id": "635e5051a358ce59d5e7ac59",
              "dish": "The French Toast",
              "ingredients": [
                  "⅔ cup almond milk",
                  "2 large eggs",
                  "1  teaspoon vanilla extract (Optional)",
                  "¼ teaspoon ground cinnamon (Optional)",
                  "salt to taste",
                  "6 thick slices bread",
                  "1 tablespoon unsalted butter, or more as needed"
              ],
              "preparation": "Whisk almond milk along with eggs, vanilla, cinnamon, and salt together in a shallow bowl. Lightly butter a griddle and heat over medium-high heat. Dunk bread in the egg mixture, soaking both sides. Transfer to the hot skillet and cook until golden, 3 to 4 minutes per side. Serve hot. ",
              "author": "Joseph Mani",
              "lastEdited": "2022-10-30T11:23:12.516Z",
              "prepTime": "15 mins",
              "veg": false
          },
          {
              "_id": "635e5167a358ce59d5e7ac5c",
              "dish": "Chicago-Style Hot Dog",
              "ingredients": [
                  "1 chicken hot dog",
                  "1 poppy seed hot dog bun",
                  "1 tablespoon yellow mustard",
                  "1 tablespoon sweet green pickle relish",
                  "1 tablespoon chopped onion",
                  "4 tomato wedges",
                  "1 dill pickle spear",
                  "2 sport peppers",
                  "1 dash celery salt"
              ],
              "preparation": "Bring a pot of water to a boil over high heat. Reduce heat to low, place hot dog in water, and cook until warmed through, about 5 minutes. Remove hot dog from water and set aside. Place a steamer basket into the pot and steam poppy seed bun until warm, about 2 minutes. Place hot dog in steamed bun. Pile on toppings in this order: mustard, relish, onion, tomato, pickle, peppers, and celery salt. The tomato wedges should be nestled between hot dog and top of bun on one side. Place pickle between hot dog and bottom of bun on the other side. Don't even think about ketchup!",
              "author": "Recipe Finder",
              "lastEdited": "2022-10-30T10:26:47.045Z",
              "prepTime": "15 mins",
              "veg": false
          },
          {
              "_id": "635e51e1a358ce59d5e7ac5e",
              "dish": "Honey Glazed Chicken",
              "ingredients": [
                  "¼ cup honey",
                  "2 tablespoons soy sauce",
                  "⅛ teaspoon red pepper flakes",
                  "1 ½ tablespoons olive oil",
                  "2 skinless, boneless chicken breast halves, cut into bite-size pieces"
              ],
              "preparation": "Whisk honey, soy sauce, and red pepper flakes in a bowl; set aside. Heat olive oil in a skillet over medium heat; cook and stir chicken in hot oil until lightly brown, about 5 minutes. Pour honey mixture into the skillet; continue to cook and stir until chicken is no longer pink in the center and sauce is thickened, about 5 minutes more. ",
              "author": "Recipe Finder",
              "lastEdited": "2022-10-30T10:28:49.772Z",
              "prepTime": "20 mins",
              "veg": false
          },
          {
              "_id": "635e5365a358ce59d5e7ac60",
              "dish": "Carrot cake",
              "ingredients": [
                  "175ml sunflower oil",
                  "175g light muscovado sugar",
                  "3 large eggs, lightly beaten",
                  "140g grated carrot (about 3 medium)",
                  "100g raisins",
                  "1 large orange, zested",
                  "175g self-raising flour",
                  "1 tsp bicarbonate of soda",
                  "1 tsp ground cinnamon",
                  "½ tsp grated nutmeg (freshly grated will give you the best flavour)",
                  "175g icing sugar",
                  "1½-2 tbsp orange juice"
              ],
              "preparation": "Heat the oven to 180C/160C fan/gas 4. Oil and line the base and sides of an 18cm square cake tin with baking parchment.Tip the sugar, sunflower oil and eggs into a big mixing bowl. Lightly mix with a wooden spoon. Stir in the carrots, raisins and orange zest. Sift the flour, bicarbonate of soda, cinnamon and nutmeg into the bowl. Mix everything together, the mixture will be soft and almost runny. Pour the mixture into the prepared tin and bake for 40-45 mins or until it feels firm and springy when you press it in the centre. Cool in the tin for 5 mins, then turn it out, peel off the paper and cool on a wire rack. (You can freeze the cake at this point if you want to serve it at a later date.) Beat the icing sugar and orange juice in a small bowl until smooth – you want the icing about as runny as single cream. Put the cake on a serving plate and boldly drizzle the icing back and forth in diagonal lines over the top, letting it drip down the sides.",
              "author": "Recipe Finder",
              "lastEdited": "2022-10-30T10:35:17.419Z",
              "prepTime": "1 hr 20 mins",
              "veg": false
          },
          {
              "_id": "635ff878c3a9a9e77c9621d8",
              "dish": "Chicken Biryani",
              "ingredients": [
                  "tomato",
                  "chicken",
                  "salt",
                  "rice"
              ],
              "preparation": "Cook everything and chicken",
              "author": "Recipe Finder",
              "lastEdited": "2022-10-31T16:31:52.317Z",
              "veg": true,
              "prepTime": "1 hr"
          }
      ]) */
  },[])
  async function getRecipes(){
    console.log("Buha")
      const response = await fetch("http://localhost:3000/api/get-recipes")
      await response.json().then((data)=>{
      setRecipes(data)
      console.log(data)
    })
  }
  return (
    <div>
        <div id="allRecipes" className="jumbotron">
          <div className="px-5">
              <h1 className="display-4">All Recipes</h1>
              <p className="lead">List of all recipes approved by RecipeFinder©</p>
              <hr className='my-4' style={{background: 'gray',height: '3px'}}/>          
              <div className="lead">
                <div className="row">
                    <div className='col-auto mb-3 mb-md-0 mx-auto d-flex flex-column'>
                        <span className='my-auto'>
                            Search for a specific recipe instead
                        </span>
                    </div>
                    <div className='col'>
                        <Link className="btn btn-warning btn-lg ml-3" to='/'>
                            Go to our Search Engine
                        </Link>
                    </div>
                </div>
              </div>
          </div>
        </div>
        <div className='container-fluid'>
            <RecipeList recipes={recipes} type={"all"}></RecipeList>
        </div>
        
    </div>
  )
}
