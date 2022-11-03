import './App.css';
import Navbar from './components/common/navbar/navbar';
import VisitorSearch from './components/visitor/visitorSearch/visitorSearch';
import AdminSearch from './components/admin/adminSearch/adminSearch';
import { Routes, Route, Navigate } from 'react-router-dom';
import AllRecipes from './components/common/allRecipes/allRecipes';
import Login from './components/admin/login/login'
import Submission from './components/visitor/newSubmission/Submission'
import AddRequests from './components/admin/pendingRequests/addRequests'
import EditRequests from './components/admin/pendingRequests/editRequests'
import VisitorTitleSearchResults from './components/visitor/visitorSearch/visitorTitleSearchResults';
import VisitorIngredientsSearchResults from './components/visitor/visitorSearch/searchByIngredients/visitorIngredientsSearchResults';
import AdminTitleSearchResults from './components/admin/adminSearch/adminTitleSearchResults';



let visitor= false;
function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/add-recipe' element={<Submission />}></Route>
        <Route path='/all-recipes' element={<AllRecipes />}></Route>
        <Route path='/' element={<Navigate to='/find'></Navigate>}></Route>
        <Route path='/add-requests' element={<AddRequests />} />
        <Route path='/edit-requests' element={<EditRequests />} />
        {visitor? <Route path='/find' element={<VisitorSearch />}></Route>
          : <Route path='/find' element={<AdminSearch />}></Route>}
        {visitor? <Route path='/search'>
          <Route path='title' element={<VisitorTitleSearchResults />}></Route>
          <Route path='ingredients' element={<VisitorIngredientsSearchResults />}></Route>
        </Route>
          : <Route path='/search'>
            <Route path='title' element={<AdminTitleSearchResults/>}></Route>
          </Route>}
      </Routes>
    </div>
  );
}

export default App;
