import Navbar from './Pages/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Attractions from './Pages/User/Attractions/Attractions';
import Missions from './Pages/User/Missions/Mission';
import Avertissement from './Pages/User/Avertissements/Avertissement';
import Accueil from './Pages/Public/Accueil/Accueil';
import AdminAvertissement from './Pages/Admin/Avertissements/AdminAvertissement';
import { UserProvider } from './assets/Context/UserContexte';
import LoginForm from './Pages/Public/Connexion/LoginForm';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AttractionDetails from './Pages/User/Attractions/AttractionsDetails';
import AffectationForm from './Pages/Admin/Affectations/AdminAffectations'; // Import du composant AffectationForm






function App() {
  
  return (
    <div className="App">
      <UserProvider>
        <ToastContainer
          position="top-center"
          autoClose={8000}
          transition={Flip}
        />
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/attractions" element={<Attractions />} />
            <Route path="/missions" element={<Missions />} />
            <Route path="/Avertissement" element={<Avertissement />} />
            <Route path="/admin/Avertissement/AdminAvertissements" element={<AdminAvertissement />} />
            <Route path="/admin/Affectations" element={<AffectationForm />} /> 
            
            <Route path="/login" element={<LoginForm />} />
            <Route path="/attractions/:id_attraction" element={<AttractionDetails />} />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;