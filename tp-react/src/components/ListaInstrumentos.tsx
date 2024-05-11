import React, { useState } from "react";
import { Instrumento } from "../data/datos";
import InstrumentoComponent from "./Instrumento";
import ModalInstrumento from "./modals/ModalInstrumento";

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
      <ModalInstrumento
        isOpen={isModalOpen}
        onClose={closeModal}
        instrumento={null}
        onSubmitSuccess={handleSubmitSuccess}
      />
      <div>
        {instrumentos.map((instrumento: Instrumento) => (
          <div key={instrumento.id}>
            <InstrumentoComponent instrumento={instrumento} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ListaInstrumentos;
