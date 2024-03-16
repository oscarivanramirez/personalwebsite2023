import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import HomePage from './pages/Homepage/home.js';
import Travels from './pages/Travels/travels.js';

const App = () => {
  // NOTE: This content is always rendered, no matter which route is matched. 
  // <>
  // <Router>
  //     <Routes>
  //       <Route path="/" element={<HomePage/>} />
  //       <Route path="/travels/*" element={<Travels/>} />
  //       <Route path="/sewing-pottery-woodwork" element={<div> This is my sewing, pottery and woodwork page</div>} />
  //       <Route path="/threejs" element={<div> Three.js creations page </div>} />
  //     </Routes>
  // </Router>
  // Hello from App.js. This content is always rendered, no matter which route is matched above.
  // </>

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/travels/*" element={<Travels/>} />
        <Route path="/sewing-pottery-woodwork" element={<div> This is my sewing, pottery, and woodwork page</div>} />
        <Route path="/threejs" element={<div> Three.js creations page </div>} />
      </Routes>
    </Router>
  );
};



export default App;