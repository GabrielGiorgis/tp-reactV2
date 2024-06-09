import Header from "./Header";
import { useDetallePedido } from "../api/useDetallePedido";
import { DetallePedido } from "../types/DetallePedido";
import { useState } from "react";

function GrillaPedidos() {
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");

  const detallesPedidos = useDetallePedido();

  const generarExcel = async () => {
    if (!fechaDesde || !fechaHasta) {
      alert("Por favor selecciona ambas fechas.");
      return;
    }

    // Construir el URL para la descarga del reporte Excel
    const url = `http://localhost:8080/api/pedidos/downloadExcelPedidos?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}`;

    // Redirigir al usuario al URL para descargar el reporte Excel
    window.location.href = url;
  };

  return (
    <>
      <Header />
      <div className="container" style={{ padding: "100px, 0" }}>
        <div className="row">
          <div className="col">
            <label htmlFor="fechaDesde" className="form-label">
              Fecha Desde:
            </label>
            <input
              id="fechaDesde"
              type="date"
              value={fechaDesde}
              onChange={(e) => setFechaDesde(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col">
            <label htmlFor="fechaHasta" className="form-label">
              Fecha Hasta:
            </label>
            <input
              id="fechaHasta"
              type="date"
              value={fechaHasta}
              onChange={(e) => setFechaHasta(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col d-flex align-items-end">
            <button className="btn btn-success" onClick={generarExcel}>
              Generar Excel
            </button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Fecha Pedido</th>
                <th>Instrumento</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {detallesPedidos.map((detalle: DetallePedido, index) => (
                <tr key={index}>
                  <td>
                    {new Date(detalle.pedido.fechaPedido).toLocaleDateString()}
                  </td>
                  <td>{detalle.instrumento.instrumento}</td>
                  <td>{detalle.instrumento.marca}</td>
                  <td>{detalle.instrumento.modelo}</td>
                  <td>{detalle.cantidad}</td>
                  <td>{detalle.instrumento.precio}</td>
                  <td>{detalle.cantidad * detalle.instrumento.precio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default GrillaPedidos;
