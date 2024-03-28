
import Navbar from './Pages/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Attractions from './Pages/User/Attractions/Attractions';
import Missions from './Pages/User/Missions/Mission';
import Avertissement from './Pages/User/Avertissements/Avertissement';
import Accueil from './Pages/Public/Accueil/Accueil';
import LoginForm from './Pages/Public/Connexion/LoginForm';




function App() {

  return (
    <div className="App">
      <Navbar />
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
