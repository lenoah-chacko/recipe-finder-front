import './App.css';
import { useState } from 'react';
import Dashboard from './components/admin/dashboard/dashboard';
import AllRecipes from './components/common/allRecipes/allRecipes';
import Navbar from './components/common/navbar/navbar';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Login></Login>
    </div>
  );
}

export default App;
