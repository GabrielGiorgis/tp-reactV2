import { useEffect, useState } from "react";
import { DetallePedido } from "../types/DetallePedido";

const url = "http://localhost:8080";

export const useDetallePedido = () => {
    const [detalles, setDetalles] = useState<DetallePedido[]>([]);
    useEffect(() => {
        const fetchDetalles = async () => {
            try {
                const response = await fetch(url + "/api/detalle-pedido");
                if (!response.ok) {
                    throw new Error("Error al obtener los datos de los pedidos");
                }
                const data = await response.json();
                setDetalles(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchDetalles();
    }, []);

    return detalles;

};

export const createDetalle = async (detalle: DetallePedido) => {
    try {
        console.log(detalle);
        const response = await fetch(url + "/api/pedido-detalle", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(detalle),
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
