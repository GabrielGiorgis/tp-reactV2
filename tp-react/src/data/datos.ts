import instrumentosData from './instrumentos.json';

export interface Instrumento {
  id: string;
  nombre: string;
  imagen: string;
  precio: string;
  costoEnvio: string;
  cantidadVendida: string;
}

const datos: Instrumento[] = instrumentosData.instrumentos.map((instrumento) => ({
  id: instrumento.id,
  nombre: instrumento.instrumento,
  imagen: instrumento.imagen,
  precio: instrumento.precio,
  costoEnvio: instrumento.costoEnvio,
  cantidadVendida: instrumento.cantidadVendida,
}));

export default datos;