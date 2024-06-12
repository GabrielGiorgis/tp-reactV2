import React, { useState } from 'react';
import './StyleSheets/Login.css'; // Importa tus estilos aquí
import { UsuarioService } from '../service/UsuarioService';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [rol, setRol] = useState('VISOR'); // Valor predeterminado

    const usuarioService = new UsuarioService();
    const navigate = useNavigate();

    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        try {
            const response = await usuarioService.register(username, password, rol)
            localStorage.setItem('idUser', response.id);
            navigate('/')
        } catch (error) {
            console.error('Error al registrar:', error);
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h2>Register</h2>
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
            <div>
                <label htmlFor="confirm-password">Confirmar Contraseña:</label>
                <input
                    type="password"
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="rol">Rol:</label>
                <select id="rol" value={rol} onChange={(e) => setRol(e.target.value)}>
                    <option value="ADMINISTRADOR">Administrador</option>
                    <option value="OPERADOR">Operador</option>
                    <option value="VISOR">Visor</option>
                </select>
            </div>
            <button type="submit">Registrarse</button>
        </form>
    );
};

export default RegisterForm;
