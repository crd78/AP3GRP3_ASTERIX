import Navbar from './Pages/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Attractions from './Pages/User/Attractions/Attractions';
import Connexion from './Pages/Public/Connexion/Connexion';
import Missions from './Pages/User/Missions/Mission';
import Avertissement from './Pages/User/Avertissements/Avertissement';
import Accueil from './Pages/Public/Accueil/Accueil';
import AdminAvertissement from './Pages/Admin/Avertissements/AdminAvertissement';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function AdminRoute({ element }) {
  const navigate = useNavigate();
  let isAdmin = false; //remttre sur false de base

  const token = localStorage.getItem('token');

  if (token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const decodedToken = JSON.parse(jsonPayload);
    isAdmin = decodedToken.isAdmin;
  }

  useEffect(() => {
    if (!isAdmin) {
      navigate('/Connexion');
    }
  }, [isAdmin, navigate]);

  return isAdmin ? element : null;
}

AdminRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/attractions" element={<Attractions />} />
          <Route path="/missions" element={<Missions />} />
          <Route path="/Avertissement" element={<Avertissement />} />
          <Route path="/Connexion" element={<Connexion />} />
          <Route path="/admin/avertissements" element={<AdminRoute element={<AdminAvertissement />} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;