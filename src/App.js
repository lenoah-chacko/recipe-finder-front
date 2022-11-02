import './App.css';
import Navbar from './components/common/navbar/navbar';
import VisitorSearch from './components/visitor/visitorSearch/visitorSearch';
import { Routes, Route,Navigate } from 'react-router-dom';
import AllRecipes from './components/common/allRecipes/allRecipes';
import Login from './components/admin/login/login'
import Submission from './components/visitor/newSubmission/Submission'
import VisitorSearchResults from './components/visitor/visitorSearch/visitorSearchResults';
import AddRequests from './components/admin/pendingRequests/addRequests'
import EditRequests from './components/admin/pendingRequests/editRequests'

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
        <Route path='/search' element={<VisitorSearchResults/>}></Route>
        <Route path='/add-requests' element={<AddRequests/>}/>
        <Route path='/edit-requests' element={<EditRequests/>}/>
      </Routes>
    </div>
  );
}

export default App;
