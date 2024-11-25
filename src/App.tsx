// App.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Sidebar/Layout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Classification from './pages/Classification';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register'; // Importamos Register
import VideoTraining from './pages/VideoTraining';
import Quiz from './pages/Quiz';
import ScrollToTop from './components/ScrollToTop'; // Importamos ScrollToTop
import PrivateRoute from './routes/PrivateRoute'; // Importamos PrivateRoute

function App() {
  return (
    <Router>
      <ScrollToTop /> {/* Añadimos el componente aquí */}
      <Routes>
        {/* Rutas que usan el Layout y requieren autenticación */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout>
                <Home />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Layout>
                <Profile />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/classification"
          element={
            <PrivateRoute>
              <Layout>
                <Classification />
              </Layout>
            </PrivateRoute>
          }
        />
        {/* Ruta dinámica para VideoTraining */}
        <Route
          path="/videoTraining/:level"
          element={
            <PrivateRoute>
              <Layout>
                <VideoTraining />
              </Layout>
            </PrivateRoute>
          }
        />
        {/* Ruta dinámica para el quiz */}
        <Route
          path="/quiz/:level"
          element={
            <PrivateRoute>
              <Layout>
                <Quiz />
              </Layout>
            </PrivateRoute>
          }
        />
        {/* Rutas que no usan el Layout y no requieren autenticación */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;