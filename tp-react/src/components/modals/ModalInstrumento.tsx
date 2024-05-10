import React, { useState } from "react";
import {
  Instrumento,
  createInstrumento,
  updateInstrumento,
} from "../../data/datos";
import "./StyleModal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  instrumento?: Instrumento | null;
  onSubmitSuccess?: () => void;
}

const ModalInstrumento: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  instrumento,
  onSubmitSuccess,
}) => {
  const [formData, setFormData] = useState<Instrumento>(
    instrumento || {
      id: null,
      instrumento: "",
      imagen: "",
      precio: "",
      costoEnvio: "",
      cantidadVendida: "",
      marca: "",
      modelo: "",
      descripcion: "",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (instrumento) {
        // Actualizar un instrumento existente
        await updateInstrumento({ ...formData, id: instrumento.id });
      } else {
        // Crear un nuevo instrumento
        await createInstrumento(formData);
      }
      onSubmitSuccess && onSubmitSuccess();
    } catch (error) {
      console.error("Error al guardar el instrumento:", error);
    }
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>
          {instrumento ? "Editar Instrumento" : "Agregar Nuevo Instrumento"}
        </h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre del instrumento:
            <input
              type="text"
              name="instrumento"
              value={formData.instrumento}
              onChange={handleChange}
            />
          </label>
          <label>
            Imagen:
            <input
              type="text"
              name="imagen"
              value={formData.imagen}
              onChange={handleChange}
            />
          </label>
          <label>
            Precio:
            <input
              type="text"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
            />
          </label>
          <label>
            Costo de Envío:
            <input
              type="text"
              name="costoEnvio"
              value={formData.costoEnvio}
              onChange={handleChange}
            />
          </label>
          <label>
            Cantidad Vendida:
            <input
              type="text"
              name="cantidadVendida"
              value={formData.cantidadVendida}
              onChange={handleChange}
            />
          </label>
          <label>
            Marca:
            <input
              type="text"
              name="marca"
              value={formData.marca}
              onChange={handleChange}
            />
          </label>
          <label>
            Modelo:
            <input
              type="text"
              name="modelo"
              value={formData.modelo}
              onChange={handleChange}
            />
          </label>
          <label>
            Descripción:
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
            />
          </label>
          <div className="modal-button-container">
            <button type="submit" className="modal-button">
              {instrumento ? "Guardar Cambios" : "Agregar Instrumento"}
            </button>
            <button onClick={onClose} className="modal-button">
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalInstrumento;
