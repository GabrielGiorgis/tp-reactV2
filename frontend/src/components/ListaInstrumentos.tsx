import React, { useEffect, useState } from "react";
import { Instrumento } from "../types/Instrumento";
import InstrumentoComponent from "./Instrumento";
import ModalInstrumento from "./modals/ModalInstrumento";
import { CarritoContextProvider } from "./context/CarritoContext";
import { Carrito } from "./Carrito";
import { UsuarioService } from "../service/UsuarioService";
import Usuario from "../types/Usuario";

const ListaInstrumentos: React.FC<{ instrumentos: Instrumento[] }> = ({
  instrumentos,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usuario, setUsuario] = useState<Usuario>();
  const usuarioService = new UsuarioService();

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

  useEffect(() => {
    const idUser = localStorage.getItem('idUser')
    if (idUser != null) {
      const fetchUsuario = async () => {
        const usuario = await usuarioService.getUsuarioByid(Number(idUser));
        if (usuario != undefined) setUsuario(usuario);
      };
      fetchUsuario();
    }
  }, []);

  return (
    <>
      <br /><br /><br />
      {/* EL provider debe englobar todos los elementos que van a ser parte del contexto del carrito */}
      <CarritoContextProvider>
        <ModalInstrumento
          isOpen={isModalOpen}
          onClose={closeModal}
          instrumento={null}
          onSubmitSuccess={handleSubmitSuccess}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
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
      {usuario && (usuario.rol === 'ADMINISTRADOR' || usuario.rol === 'OPERADOR') && (
        <button
          onClick={openModal}
          style={{
            position: "fixed",
            bottom: "23px",
            right: "90px",
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
      )}
    </>
  );
};

export default ListaInstrumentos;
