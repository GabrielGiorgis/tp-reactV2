import { Pedido } from "../types/Pedido";

export async function createPreferenceMP(pedido?:Pedido) {
    let urlServer = "http://localhost:8080/api/pedidos/create_preference_mp";
    let method:string = "POST";
    const response = await fetch(urlServer, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(pedido),
    });
    const data = await response.json();
    return data;
}