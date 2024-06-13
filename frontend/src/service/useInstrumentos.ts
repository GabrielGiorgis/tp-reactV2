import { useEffect, useState } from "react";
import { Instrumento } from "../types/Instrumento";

const url = "http://localhost:8080";

export const useInstrumentos = () => {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);

  useEffect(() => {
    const fetchInstrumentos = async () => {
      try {
        const response = await fetch(url + "/api/instrumentos");
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
    const response = await fetch(url + `/api/instrumentos/${id}`);
    console.log(response);
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
    const response = await fetch(url + "/api/instrumentos", {
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
      url + `/api/instrumentos/${instrumento.idinstrumento}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(instrumento),
      }
    );
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
    const response = await fetch(url + `/api/instrumentos/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error al eliminar el instrumento");
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// Cargar datos del JSON
export const loadInstrumentosFromJson = async () => {
  try {
    const response = await fetch(url + "/api/instrumentos/load-json", {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error("Error al cargar los datos del JSON");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al cargar los datos del JSON:", error);
    throw error;
  }
};
