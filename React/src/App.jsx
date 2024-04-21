import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Missions from './Pages/User/Missions/Mission';
import Avertissement from './Pages/User/Avertissements/Avertissement';
import Accueil from './Pages/Public/Accueil/Accueil';
import AdminAvertissement from './Pages/Admin/Avertissements/AdminAvertissement';
import { UserProvider } from './assets/Context/UserContexte';
import LoginForm from './Pages/Public/Connexion/LoginForm';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AttractionDetails from './Pages/User/Attractions/AttractionsDetails';
import Dashboard from './Pages/Admin/Dashboard/Dashboard';
import GestionUtilisateurs from './Pages/Admin/GestionUtilisateurs/GestionUtilisateurs';
import AttractionAll from './Pages/User/Attractions/AttractionAll';
import Navbar from './Pages/Navbar/Navbar';
import Attractions from './Pages/User/Attractions/Attractions';




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
            <Route path="/login" element={<LoginForm />} />
            <Route path="/attractions/:id_attraction" element={<AttractionDetails />} />
            <Route path="/admin/Dashboard" element={<Dashboard />} />
            <Route path="/admin/utilisateurs" element={<GestionUtilisateurs />} />
            <Route path="/attractions/theme/:id_themes" element={<AttractionAll />} />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;