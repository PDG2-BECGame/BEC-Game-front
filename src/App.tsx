import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Sidebar/Layout'; // Importamos el componente Layout
import Home from './pages/Home';  // Ruta de Home
import Profile from './pages/Profile';  // Nueva ruta de Perfil
import Classification from './pages/Classification';  // Nueva ruta de Clasificación
import Login from './pages/Auth/Login';  // Ruta de Login
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas que usan el Layout */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
        <Route
          path="/classification"
          element={
            <Layout>
              <Classification />
            </Layout>
          }
        />
        
        {/* Rutas que no usan el Layout */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
