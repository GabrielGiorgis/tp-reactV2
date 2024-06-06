import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Usuario from '../entidades/Usuario.ts';
import { UsuarioService } from '../service/UsuarioService.ts';

export const RutaPrivada = ({ children }: { children: ReactNode }) => {
    const [usuario, setUsuario] = useState<Usuario | undefined>();
    const navigate = useNavigate();
    const usuarioService = new UsuarioService();

    useEffect(() => {
        const idUser = localStorage.getItem('idUser')
        if (idUser != null) {
            const fetchUsuario = async () => {
                const usuario = await usuarioService.getUsuarioByid(Number(idUser));
                if (usuario != undefined) setUsuario(usuario);
                else navigate('/login'); // Redirige al usuario a la página de inicio de sesión si no se encuentra el usuario
            };
            fetchUsuario();
        } else {
            navigate('/login'); // Redirige al usuario a la página de inicio de sesión si no se encuentra el ID de usuario
        }
    }, [navigate]);

    return usuario ? children : null; // Renderiza el contenido protegido solo si el usuario está definido
};
