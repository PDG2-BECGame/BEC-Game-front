import React, { useState } from 'react';
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/auth/login', { email, password });
            const { token } = response.data;
            localStorage.setItem('token', token); // Guarda el token para usar en futuras peticiones
            // Redirige al perfil o pantalla de éxito
        } catch (err) {
            if (axios.isAxiosError(err)) {
                // Si es un error de Axios, entonces puedes acceder a response
                setError(err.response?.data?.message || "Ocurrió un error en el login.");
            } else {
                // Para otros tipos de error, manejar de forma genérica
                setError("Ocurrió un error inesperado.");
            }
        }

    };

    return (
        <div>
            <h2>Login</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
            />
            {error && <p>{error}</p>}
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
