import { Categoria } from "./Categoria";

export interface Instrumento {
    idinstrumento: number;
    instrumento: string;
    marca: string;
    modelo: string;
    imagen: string;
    precio: number;
    costoenvio: string;
    cantidadvendida: number;
    descripcion: string;
    categoria: Categoria;
    cantidadEnCarrito: number;
    eliminado: boolean;
}