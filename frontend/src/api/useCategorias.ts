import { useEffect, useState } from "react";
import { Categoria } from "../types/Categoria";

const url = "http://localhost:8080";

export const useCategorias = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch(url + "/api/categorias");
        if (!response.ok) {
          throw new Error("Error al obtener los datos de las categorias");
        }
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategorias();
  }, []);

  return categorias;
};

export const getOneCategoria = async (id: number) => {
  try {
    const response = await fetch(url + `/api/categorias/${id}`);
    if (!response.ok) {
      throw new Error("Error al obtener la categoría");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const createCategoria = async (categoria: Categoria) => {
  try {
    const response = await fetch(url + "/api/categorias", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoria),
    });
    if (!response.ok) {
      throw new Error("Error al crear la categoría");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateCategoria = async (categoria: Categoria) => {
  try {
    const response = await fetch(
      url + `/api/categorias/${categoria.idcategoria}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoria),
      }
    );
    if (!response.ok) {
      throw new Error("Error al actualizar la categoría");
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteCategoria = async (id: number) => {
  try {
    const response = await fetch(url + `/api/categorias/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error al eliminar la categoría");
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
