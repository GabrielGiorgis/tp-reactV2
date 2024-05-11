import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  deleteInstrumento,
  getOneInstrumento,
  Instrumento,
} from "../data/datos";
import "../components/StyleSheets/StyleInstrumentoDetalle.css";
import ModalInstrumento from "./modals/ModalInstrumento";

const DetalleInstrumento = () => {
  const { id } = useParams();
  const [instrumento, setInstrumento] = useState<Instrumento | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const data = await getOneInstrumento(parseInt(id));
        setInstrumento(data);
      }
    };
    fetchData();
  }, [id]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteInstrumento = async () => {
    if (instrumento && instrumento.id) {
      const deleted = await deleteInstrumento(instrumento.id);
      if (deleted) {
        console.log("Instrumento eliminado exitosamente");
        window.location.href = "/instrumentos/list";
      } else {
        // Lógica para manejar el error de eliminación
        console.error("Error al eliminar el instrumento");
      }
    }
  };

  const handleSubmitSuccess = async () => {
    // Actualizar el instrumento después de la edición exitosa
    if (id) {
      const data = await getOneInstrumento(parseInt(id));
      setInstrumento(data);
    }
  };

  if (!instrumento) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="instrumento-container">
      <div className="instrumento-acciones">
        <button className="instrumento-boton-modificar" onClick={openModal}>
          Modificar
        </button>
        <ModalInstrumento
          isOpen={isModalOpen}
          onClose={closeModal}
          instrumento={instrumento}
          onSubmitSuccess={handleSubmitSuccess}
        />
        <button
          className="instrumento-boton-eliminar"
          onClick={handleDeleteInstrumento}
        >
          Eliminar
        </button>
      </div>
      <div className="instrumento-header">
        <div className="instrumento-titulo-imagen">
          <h2>{instrumento.instrumento}</h2>
          <img
            src={"../../img/" + instrumento.imagen}
            alt={instrumento.instrumento}
            className="instrumento-imagen"
          />
        </div>
        <div className="instrumento-precio-envio">
          <p className="instrumento-precio">Precio: ${instrumento.precio}</p>
          {parseFloat(instrumento.costoenvio) === 0 ||
          instrumento.costoenvio === "G" ? (
            <p className="instrumento-costo-envio" style={{ color: "#3FBF48" }}>
              <img src="../../img/camion.png" alt="Camión" />
              Envío gratis a todo el país
            </p>
          ) : (
            <p className="instrumento-costo-envio" style={{ color: "#F2620F" }}>
              Costo de Envío Interior de Argentina: ${instrumento.costoenvio}
            </p>
          )}
        </div>
      </div>
      <div className="instrumento-detalles">
        <p className="instrumento-marca">Marca: {instrumento.marca}</p>
        <p className="instrumento-modelo">Modelo: {instrumento.modelo}</p>
        <p className="instrumento-cantidad">Cantidad Vendida: {instrumento.cantidadvendida}</p>
        <p className="instrumento-descripcion">{instrumento.descripcion}</p>
      </div>
      <div className="instrumento-acciones">
        <button className="instrumento-boton-agregar">
          Agregar al carrito
        </button>
        <button className="instrumento-boton-comprar">Comprar ahora</button>
      </div>
    </div>
  );
};

export default DetalleInstrumento;
