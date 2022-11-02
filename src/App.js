import './App.css';
import Navbar from './components/common/navbar/navbar';
import VisitorSearch from './components/visitor/visitorSearch/visitorSearch';
import { Routes, Route,Navigate } from 'react-router-dom';
import AllRecipes from './components/common/allRecipes/allRecipes';
import Login from './components/admin/login/login'
import Submission from './components/visitor/newSubmission/Submission'
import TitleSearchResults from './components/visitor/visitorSearch/titleSearchResults';
import IngredientsSearchResults from './components/visitor/visitorSearch/searchByIngredients/ingredientsSearchResults';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/add-recipe' element={<Submission/>}></Route>
        <Route path='/all-recipes' element={<AllRecipes/>}></Route>
        <Route path='/find' element={<VisitorSearch/>}></Route>
        <Route path='/' element={ <Navigate to='/find'></Navigate> }></Route>
        <Route path='/search'>
          <Route path='title' element={<TitleSearchResults/>}></Route>
          <Route path='ingredients' element={<IngredientsSearchResults/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
