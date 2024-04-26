import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOneInstrumento, Instrumento } from '../data/datos';
import '../components/StyleSheets/StyleInstrumentoDetalle.css'

const DetalleInstrumento = () => {
  const { id } = useParams(); // Obtener el parámetro 'id' de la URL
  const [instrumento, setInstrumento] = useState<Instrumento | null>(null);

  useEffect(() => {
    // Verificar si id tiene un valor antes de llamar a getOneInstrumento
    if (id) {
      const fetchInstrumento = async () => {
        const data = await getOneInstrumento(id);
        setInstrumento(data);
      };

      fetchInstrumento();
    }
  }, [id]);

  if (!instrumento) {
    return <div>Cargando...</div>;
  }

  // Renderizar los detalles del instrumento
  return (
    <div className="instrumento-container">
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
          <p className="instrumento-costo-envio">Costo de envío: ${instrumento.costoEnvio}</p>
        </div>
      </div>
      <div className="instrumento-detalles">
        <p className="instrumento-marca">Marca: {instrumento.marca}</p>
        <p className="instrumento-modelo">Modelo: {instrumento.modelo}</p>
        <p className="instrumento-descripcion">{instrumento.descripcion}</p>
      </div>
      <div className="instrumento-acciones">
        <button className="instrumento-boton-agregar">Agregar al carrito</button>
        <button className="instrumento-boton-comprar">Comprar ahora</button>
      </div>
    </div>
  );
};

export default DetalleInstrumento;