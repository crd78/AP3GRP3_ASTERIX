import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Pages/Navbar/Navbar';
import Accueil from './Pages/User/Accueil/Accueil';


function App() {

  return (
    <div className="App">
      <Navbar />
        <Router>
          <Routes>
            <Route path="/" element={<Accueil />} />
          </Routes>
        </Router> 
    </div>
  )
}

export default App
