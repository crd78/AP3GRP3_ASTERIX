
import Navbar from './Pages/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Attractions from './Pages/User/Attractions/Attractions';
import Missions from './Pages/User/Missions/Mission';
import Avertissement from './Pages/User/Avertissements/Avertissement';
import Accueil from './Pages/Public/Accueil/Accueil';
import LoginForm from './Pages/Public/Connexion/LoginForm';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {

  return (
    <div className="App">
      <Navbar />
      <ToastContainer
        position="top-center"
        autoClose={8000}
        transition={Flip}
      />
      <Router>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/attractions" element={<Attractions />} />
          <Route path="/missions" element={<Missions />} />
          <Route path="/Advertissement" element={<Avertissement />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Router>

    </div>
  )
}

export default App
