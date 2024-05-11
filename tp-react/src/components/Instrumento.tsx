import React from "react";
import { Instrumento } from "../data/datos";
import { Col, Container, Row } from "react-bootstrap";

interface InstrumentoProps {
  instrumento: Instrumento;
}

const InstrumentoComponent: React.FC<InstrumentoProps> = ({ instrumento }) => {
  return (
    <Container>
      <Row style={{ marginTop: "30px", marginBottom: "30px" }}>
        <Col>
          <img
            src={"../../img/" + instrumento.imagen}
            alt={instrumento.instrumento}
          />
        </Col>
        <Col xs={10}>
          <h6>{instrumento.instrumento}</h6>
          <h3>${instrumento.precio}</h3>
          {instrumento.costoenvio === "0.00" ||
          instrumento.costoenvio === "G" ? (
            <p style={{ color: "#3FBF48" }}>
              <img src="../../img/camion.png" alt="Camión" /> Envío gratis a
              todo el país
            </p>
          ) : (
            <p style={{ color: "#F2620F" }}>
              Costo de Envío Interior de Argentina: ${instrumento.costoenvio}
            </p>
          )}
          <p>{instrumento.cantidadvendida} vendidos</p>
          <button
            onClick={() =>
              (window.location.href = `/instrumentos/list/${instrumento.id}`)
            }
            style={{
              backgroundColor: "white",
              color: "#007bff",
              border: "1px solid #007bff",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Ver más
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default InstrumentoComponent;
