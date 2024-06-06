import React, { useState } from 'react';
import './StyleSheets/Login.css'
import { UsuarioService } from './service/UsuarioService';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const usuarioService = new UsuarioService();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await usuarioService.login(username, password)
            localStorage.setItem('idUser', response.id)
            if (response != null) {
                return navigate(-1);
            }
            return navigate('/register');
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div>
                <label htmlFor="username">Usuario:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Contraseña:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <a href="/register">Registrarse</a>
            <button type="submit">Iniciar sesión</button>
        </form>
    );
};

export default LoginForm;
