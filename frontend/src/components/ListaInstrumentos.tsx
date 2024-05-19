import React, { useState } from "react";
import { Instrumento } from "../types/Instrumento";
import InstrumentoComponent from "./Instrumento";
import ModalInstrumento from "./modals/ModalInstrumento";
import { CarritoContextProvider } from "./context/CarritoContext";
import { Carrito } from "./Carrito";

const ListaInstrumentos: React.FC<{ instrumentos: Instrumento[] }> = ({
  instrumentos,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitSuccess = () => {
    console.log("Instrumento creado exitosamente");
    window.location.reload();
    closeModal();
  };

  return (
    <>
      {/* EL provider debe englobar todos los elementos que van a ser parte del contexto del carrito */}
      <CarritoContextProvider>
        <ModalInstrumento
          isOpen={isModalOpen}
          onClose={closeModal}
          instrumento={null}
          onSubmitSuccess={handleSubmitSuccess}
        />
        <div style={{ display: "flex" , justifyContent: "space-between"}}>
          <div>
            {instrumentos.map((instrumento: Instrumento) => (
              <div key={instrumento.idinstrumento}>
                <InstrumentoComponent instrumento={instrumento} />
              </div>
            ))}
          </div>
          <Carrito />
        </div>
      </CarritoContextProvider>
      <button
        onClick={openModal}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Agregar Instrumento
      </button>
    </>
  );
};

export default ListaInstrumentos;
