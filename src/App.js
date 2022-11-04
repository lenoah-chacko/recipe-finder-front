import './App.css';
import Navbar from './components/common/navbar/navbar';
import VisitorSearch from './components/visitor/visitorSearch/visitorSearch';
import AdminSearch from './components/admin/adminSearch/adminSearch';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import AllRecipes from './components/common/allRecipes/allRecipes';
import Login from './components/admin/login/login'
import Submission from './components/visitor/newSubmission/Submission'
import AddRequests from './components/admin/pendingRequests/addRequests'
import EditRequests from './components/admin/pendingRequests/editRequests'
import VisitorTitleSearchResults from './components/visitor/visitorSearch/visitorTitleSearchResults';
import VisitorIngredientsSearchResults from './components/visitor/visitorSearch/searchByIngredients/visitorIngredientsSearchResults';
import AdminTitleSearchResults from './components/admin/adminSearch/adminTitleSearchResults';
import NotFound from './components/common/notFound/notFound'
import ProtectedRoutes from './components/admin/authServices/protectedRoutes'
import { useEffect, useState } from 'react';
import AuthService from './components/admin/authServices/authService';
import Dashboard from './components/admin/dashboard/dashboard';
import EditRequestExpanded from './components/admin/pendingRequests/editRequestExpanded/editRequestExpanded';
import ProtectedFromAdminRoutes from './components/admin/authServices/protectedFromAdminRoutes';
import AdminAddRecipe from './components/admin/recipeOperations/addRecipeAdmin/addRecipeAdmin';

function App() {
  const [auth, setAuth] = useState("neutral")

  function checkAuth() {
      if (auth == "unauthorized") {
          return <Navigate to='/login' replace />;
      }
      else if (auth == "authorized") {

          return <Outlet/>;
      }
      else if (auth == "neutral") {
          setTimeout(checkAuth,500)
      }
  }
  return (
    <div className="App">
      <Navbar auth={auth} setAuth={setAuth}></Navbar>
      <Routes>
        <Route element={<ProtectedRoutes setAuth={setAuth} checkAuth={checkAuth}/>}>
          <Route path='/admin/find' element={<AdminSearch />}></Route>
          <Route path='/admin/search'>
            <Route path='title' element={<AdminTitleSearchResults />}></Route>
          </Route>
          <Route path='/admin/add-requests' element={<AddRequests />} />
          <Route path='/admin/edit-requests' element={<EditRequests />} />
          <Route path='/admin/add-recipe' element={<AdminAddRecipe />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/pending'>
            <Route path='submissions' element={<AddRequests />} />
            <Route path='edits'>
              <Route index element={<EditRequests />} />
              <Route path=':id' element={<EditRequestExpanded />} />
            </Route>
          </Route>
        </Route>
        <Route element={<ProtectedFromAdminRoutes setAuth={setAuth} checkAuth={checkAuth}/>}>
          <Route path='/login' element={<Login setAuth={setAuth} />}></Route>
          <Route path='/find' element={<VisitorSearch />}></Route>
          <Route path='/search'>
            <Route path='title' element={<VisitorTitleSearchResults />}></Route>
            <Route path='ingredients' element={<VisitorIngredientsSearchResults />}></Route>
          </Route>
        </Route>

        <Route path='/add-recipe' element={<Submission />}></Route>
        <Route path='/all-recipes' element={<AllRecipes auth={auth}/>}></Route>
        <Route path='/' element={<Navigate to='/find'></Navigate>}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </div >
  );
}

export default App;

