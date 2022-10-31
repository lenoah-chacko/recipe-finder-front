import './App.css';
import { useState } from 'react';
import Dashboard from './components/admin/dashboard/dashboard';
import AllRecipes from './components/common/allRecipes/allRecipes';
import Navbar from './components/common/navbar/navbar';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <AllRecipes></AllRecipes>    
    {/* Footer */}
    Bullshit
    </div>
  );
}

export default App;
