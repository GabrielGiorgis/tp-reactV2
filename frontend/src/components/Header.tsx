import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { UsuarioService } from "./service/UsuarioService";
import Usuario from "./entidades/Usuario";

export default function Header() {

    const [usuario, setUsuario] = useState<Usuario>();

    const usuarioService = new UsuarioService();

    useEffect(() => {
        const idUser = localStorage.getItem('idUser');
        if (idUser != null) {
            const fetchUsuario = async () => {
                const usuario = await usuarioService.getUsuarioByid(Number(idUser));
                if (usuario != undefined) {
                    setUsuario(usuario);
                    console.log(usuario)
                }
            };
            fetchUsuario();
        }
    }, [])

    return (
        <>
            <Navbar bg="light" data-bs-theme="light" style={{ position: "fixed", width: "100vw" }}>
                <Container style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ display: "flex" }}>
                        <Navbar.Brand href="#home">Musical Hendrix</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="/">Inicio</Nav.Link>
                            <Nav.Link href="/ubicacion">Donde Estamos</Nav.Link>
                            <Nav.Link href="/instrumentos">Instrumentos</Nav.Link>
                        </Nav>
                    </div>
                    {usuario ?
                        <Nav.Link href="/logout">Cerrar sesión de {usuario.nombreUsuario}</Nav.Link>
                        :
                        <Nav.Link href="/login">Inicia Sesión</Nav.Link>
                    }
                </Container>
            </Navbar>
        </>
    );
}