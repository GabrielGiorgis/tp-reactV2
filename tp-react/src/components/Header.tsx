import { Container, Nav, Navbar } from "react-bootstrap";

export default function ColorSchemesExample() {
    return (
        <>
            <Navbar bg="light" data-bs-theme="light">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/instrumentos">Instrumentos</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}