import { Instrumento } from "./Instrumento";
import { Pedido } from "./Pedido";
export interface DetallePedido{
    cantidad : number;
    instrumento : Instrumento;
    pedido : Pedido;
}