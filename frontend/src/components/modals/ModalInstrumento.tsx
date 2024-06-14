import React, { useEffect, useState } from "react";
import { Instrumento } from "../../types/Instrumento";
import {
  createInstrumento,
  updateInstrumento,
} from "../../service/useInstrumentos";
import { useCategorias } from "../../service/useCategorias";
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
  const categorias = useCategorias();
  const [formData, setFormData] = useState<Instrumento>(
    instrumento || {
      idinstrumento: 0,
      instrumento: "",
      imagen: "",
      precio: 0,
      costoenvio: "",
      cantidadvendida: 0,
      marca: "",
      modelo: "",
      descripcion: "",
      categoria: categorias[0] || { id: 0, denominacion: "" },
      cantidadEnCarrito: 0,
      eliminado: false
    }
  );

  useEffect(() => {
    if (instrumento) {
      setFormData(instrumento);
    } else if (categorias.length > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        idcategoria: categorias[0],
      }));
    }
  }, [instrumento, categorias]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "idcategoria") {
      const selectedCategoria = categorias.find(
        (categoria) => categoria.idcategoria === Number(value)
      );
      setFormData({
        ...formData,
        categoria: selectedCategoria || formData.categoria,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (instrumento) {
        // Actualizar un instrumento existente
        await updateInstrumento({
          ...formData,
          idinstrumento: instrumento.idinstrumento,
        });
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
              type="number"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
            />
          </label>
          <label>
            Costo de Envío:
            <input
              type="text"
              name="costoenvio"
              value={formData.costoenvio}
              onChange={handleChange}
            />
          </label>
          <label>
            Cantidad Vendida:
            <input
              type="number"
              name="cantidadvendida"
              value={formData.cantidadvendida}
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
          <label>
            Categoría:
            <select
              name="idcategoria"
              value={formData.categoria.idcategoria}
              onChange={handleChange}
            >
              {categorias.map((categoria) => (
                <option
                  key={categoria.idcategoria}
                  value={categoria.idcategoria}
                >
                  {categoria.denominacion}
                </option>
              ))}
            </select>
          </label>
          <div className="modal-button-container">
            <button type="submit" className="modal-button">
              {instrumento ? "Guardar Cambios" : "Agregar Instrumento"}
            </button>
            <button type="button" onClick={onClose} className="modal-button">
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalInstrumento;
