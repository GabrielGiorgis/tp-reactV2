import { useEffect, useState } from 'react';

export interface Instrumento {
  id: string;
  instrumento: string;
  imagen: string;
  precio: string;
  costoEnvio: string;
  cantidadVendida: string;
  marca: string;
  modelo: string;
  descripcion: string;
}

const useInstrumentos = () => {
  const [instrumentos, setInstrumentos] = useState([]);

  useEffect(() => {
    const fetchInstrumentos = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/instrumentos');
        if (!response.ok) {
          throw new Error('Error al obtener los datos de los instrumentos');
        }
        const data = await response.json();
        setInstrumentos(data);
      } catch (error) {
        console.error(error);
        // Aquí puedes manejar el error como lo necesites
      }
    };

    fetchInstrumentos();
  }, []);

  return instrumentos;
};

export default useInstrumentos;
