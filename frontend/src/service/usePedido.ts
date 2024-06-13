import { useEffect, useState } from "react";
import { Pedido } from "../types/Pedido";

const url = "http://localhost:8080";

export const usePedido = () => {
    const [pedido, setPedido] = useState<Pedido[]>([]);

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const response = await fetch(url + "/api/pedidos");
                if (!response.ok) {
                    throw new Error("Error al obtener los datos de los pedidos");
                }
                const data = await response.json();
                setPedido(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPedidos();
    }, []);

    return pedido;
};

export const createPedido = async (pedido: Pedido) => {
    try {
        const response = await fetch(url + "/api/pedidos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pedido),
        });
        if (!response.ok) {
            throw new Error("Error al crear el pedido");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};
