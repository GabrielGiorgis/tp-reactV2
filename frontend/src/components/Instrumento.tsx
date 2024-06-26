import React from "react";
import { Instrumento } from "../types/Instrumento";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useCarrito } from "../hooks/useCarrito";
import "./StyleSheets/Instrumento.css";

interface InstrumentoProps {
  instrumento: Instrumento;
}

const InstrumentoComponent: React.FC<InstrumentoProps> = ({ instrumento }) => {
  //Solo se llama a los metodos necesarios, en este caso limpiar carrito no tiene sentido, tambien paso la variable de estado cart
  const { addCarrito, removeCarrito, cart, removeItemCarrito } = useCarrito();

  const verificarInstrumentoEnCarrito = (product: Instrumento) => {
    return cart.some((item) => item.idinstrumento === product.idinstrumento);
  };

  const isPlatoEnCarrito = verificarInstrumentoEnCarrito(instrumento);
  return (
    <Container>
      <Row
        style={{
          marginTop: "30px",
          marginBottom: "30px",
          opacity: instrumento.eliminado ? 0.5 : 1,
          pointerEvents: instrumento.eliminado ? "none" : "auto",
          position: "relative",
        }}
      >
        {instrumento.eliminado && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(128, 128, 128, 0.5)",
              zIndex: 1,
            }}
          ></div>
        )}
        <Col>
          <img
            src={`http://localhost:8080/images/${instrumento.imagen}`}
            alt={instrumento.instrumento}
          />
        </Col>
        <Col xs={10}>
          <h6>{instrumento.instrumento}</h6>
          <h3>${instrumento.precio}</h3>
          {instrumento.costoenvio === "0.00" ||
          instrumento.costoenvio === "G" ? (
            <p style={{ color: "#3FBF48" }}>
              <img src="http://localhost:8080/images/camion.png" alt="Camión" />{" "}
              Envío gratis a todo el país
            </p>
          ) : (
            <p style={{ color: "#F2620F" }}>
              Costo de Envío Interior de Argentina: ${instrumento.costoenvio}
            </p>
          )}
          <p>{instrumento.cantidadvendida} vendidos</p>
          <button
            onClick={() =>
              (window.location.href = `/instrumentos/${instrumento.idinstrumento}`)
            }
            style={{
              backgroundColor: "white",
              color: "#007bff",
              border: "1px solid #007bff",
              borderRadius: "4px",
              cursor: instrumento.eliminado ? "not-allowed" : "pointer",
            }}
            disabled={instrumento.eliminado}
          >
            Ver más
          </button>
        </Col>
      </Row>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          opacity: instrumento.eliminado ? 0.5 : 1,
          pointerEvents: instrumento.eliminado ? "none" : "auto",
        }}
      >
        <button
          className="iconoMasMenos"
          onClick={() => removeItemCarrito(instrumento)}
          disabled={instrumento.eliminado}
        >
          -
        </button>
        <Button
          style={{
            border: "none",
            backgroundColor: "transparent",
            padding: "0",
            boxShadow: "none",
          }}
          onClick={() =>
            isPlatoEnCarrito
              ? removeCarrito(instrumento)
              : addCarrito(instrumento)
          }
          disabled={instrumento.eliminado}
        >
          {isPlatoEnCarrito ? (
            <Button>Eliminar de Carrito</Button>
          ) : (
            <Button>Agregar al carrito</Button>
          )}
        </Button>
        <button
          className="iconoMasMenos"
          onClick={() => addCarrito(instrumento)}
          disabled={instrumento.eliminado}
        >
          +
        </button>
      </div>
    </Container>
  );
};

export default InstrumentoComponent;
