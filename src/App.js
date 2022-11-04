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
import { useState } from 'react';
import Dashboard from './components/admin/dashboard/dashboard';
import EditRequestExpanded from './components/admin/pendingRequests/editRequestExpanded/editRequestExpanded';
import ProtectedFromAdminRoutes from './components/admin/authServices/protectedFromAdminRoutes';
import AdminAddRecipe from './components/admin/recipeOperations/addRecipeAdmin/addRecipeAdmin';
import AuthService from './components/admin/authServices/authService';
import UnprotectedRoutes from './components/admin/authServices/unprotectedRoutes'
function App() {
  const [auth, setAuth] = useState("neutral")

  async function authorizeUser()
  {
      let authorized=await AuthService()
      setAuth(authorized)
  }

  function checkAuth(desirable,nondesirable) {
    console.log({"auth":auth,"desirable":desirable,"nondesirable":nondesirable})
      if (auth === nondesirable) {
          console.log("You are not authorized to view this page. Please log in.")
          return desirable==="unauthorized"?<Navigate to='/all-recipes' replace />:<Navigate to='/dashboard' replace />;
      }
      else if (auth === desirable) {
          console.log("authorized")
          return <Outlet/>;
      }
      else if (auth === "neutral") {
          setTimeout(checkAuth,500)
      }
  }
  return (
    <div className="App">
      <Navbar auth={auth} setAuth={setAuth}></Navbar>
      <Routes>
        <Route element={<ProtectedRoutes authorizeUser={authorizeUser} setAuth={setAuth} checkAuth={checkAuth}/>}>
          <Route path='/admin/find' element={<AdminSearch />}></Route>
          <Route path='/admin/search'>
            <Route path='title' element={<AdminTitleSearchResults auth={auth} />}></Route>
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
        <Route element={<ProtectedFromAdminRoutes authorizeUser={authorizeUser} setAuth={setAuth} checkAuth={checkAuth}/>}>
          <Route path='/login' element={<Login setAuth={setAuth} />}></Route>
          <Route path='/find' element={<VisitorSearch />}></Route>
          <Route path='/search/title' element={<VisitorTitleSearchResults />}></Route>
          <Route path='/search/ingredients' element={<VisitorIngredientsSearchResults />}></Route>
        </Route>
        <Route element={<UnprotectedRoutes authorizeUser={authorizeUser} setAuth={setAuth} checkAuth={checkAuth}/>}>
          <Route path='/add-recipe' authorizeUser={authorizeUser} element={<Submission />}></Route>
          <Route path='/all-recipes' authorizeUser={authorizeUser} element={<AllRecipes auth={auth}/>}></Route>
          <Route path='/' element={<Navigate to='/find'></Navigate>}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Route>

      </Routes>
    </div >
  );
}

export default App;

