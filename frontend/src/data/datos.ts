import { useEffect, useState } from "react";

export interface Instrumento {
  id: number | null | undefined;
  instrumento: string;
  imagen: string;
  precio: string;
  costoenvio: string;
  cantidadvendida: string;
  marca: string;
  modelo: string;
  descripcion: string;
}

export const useInstrumentos = () => {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);

  useEffect(() => {
    const fetchInstrumentos = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/instrumentos/list"
        );
        if (!response.ok) {
          throw new Error("Error al obtener los datos de los instrumentos");
        }
        const data = await response.json();
        setInstrumentos(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchInstrumentos();
  }, []);

  return instrumentos;
};

export const getOneInstrumento = async (id: number) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/instrumentos/${id}`
    );
    if (!response.ok) {
      throw new Error("Error al obtener el instrumento");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const createInstrumento = async (instrumento: Instrumento) => {
  try {
    const response = await fetch("http://localhost:3000/api/instrumentos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(instrumento),
    });
    if (!response.ok) {
      throw new Error("Error al crear el instrumento");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateInstrumento = async (instrumento: Instrumento) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/instrumentos/${instrumento.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(instrumento),
      }
    );
    console.log(response);
    if (!response.ok) {
      throw new Error("Error al actualizar el instrumento");
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteInstrumento = async (id: number) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/instrumentos/${id}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Error al eliminar el instrumento");
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
