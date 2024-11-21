import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Sidebar/Layout'; // Importamos el componente Layout
import Home from './pages/Home';  // Ruta de Home
import Profile from './pages/Profile';  // Nueva ruta de Perfil
import Classification from './pages/Classification';  // Nueva ruta de Clasificación
import Login from './pages/Auth/Login';  // Ruta de Login
import './App.css';
import VideoTraining from './pages/VideoTraining'; // Importa VideoTraining
import Quiz from './pages/Quiz'; // Importa la página del Quiz

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
                <Route
                    path="/videoTraining"
                    element={
                        <Layout>
                            <VideoTraining />
                        </Layout>
                    }
                />

                {/* Ruta dinámica para el quiz */}
                <Route
                    path="/quiz/:level"
                    element={
                        <Layout>
                            <Quiz />
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
