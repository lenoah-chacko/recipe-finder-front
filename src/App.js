import './App.css';
import { useState } from 'react';
import Navbar from './components/common/navbar/navbar';
import VisitorSearch from './components/visitor/visitorSearch/visitorSearch';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <VisitorSearch></VisitorSearch>
    </div>
  );
}

export default App;
