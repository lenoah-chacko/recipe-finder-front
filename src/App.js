import './App.css';
import { useState } from 'react';
import Navbar from './components/common/navbar/navbar';
import Login from './components/admin/login/Login';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Login></Login>
    </div>
  );
}

export default App;
