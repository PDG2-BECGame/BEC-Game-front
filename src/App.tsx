import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Sidebar/Layout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Classification from './pages/Classification';
import Login from './pages/Auth/Login';
import VideoTraining from './pages/VideoTraining';
import Quiz from './pages/Quiz';
import ScrollToTop from './components/ScrollToTop'; // Importamos ScrollToTop

function App() {
    return (
        <Router>
            <ScrollToTop /> {/* Añadimos el componente aquí */}
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
                {/* Ruta dinámica para VideoTraining */}
                <Route
                    path="/videoTraining/:level"
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