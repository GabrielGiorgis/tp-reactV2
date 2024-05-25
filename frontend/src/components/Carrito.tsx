import { createPedido } from "../api/usePedido";
import { useCarrito } from "../hooks/useCarrito";
import { Instrumento } from "../types/Instrumento";
import { Pedido } from "../types/Pedido";
import {DetallePedido} from "../types/DetallePedido";
import "./StyleSheets/StyleCart.css"
import { createDetalle } from "../api/useDetallePedido";
import { CheckoutMP } from "./CheckoutMP";

function CartItem(item: Instrumento) {
    return (
        <div className="cart-item" key={item.idinstrumento}>
            <img className="cart-item-image" src={"../../img/"+item.imagen} alt={item.instrumento} />
            <div className="cart-item-details">
                <p className="cart-item-name"><strong>{item.instrumento}</strong></p>
                <p className="cart-item-shipping">{item.costoenvio}</p>
                <p className="cart-item-price"><strong>{item.precio}</strong></p>
                <p className="cart-item-quantity" style={{ color: "red" }}>Cantidad: {item.cantidadEnCarrito}</p>
            </div>
        </div>
    )
}

export function Carrito() {
    const { cart, removeCarrito, addCarrito, limpiarCarrito } = useCarrito();

    const mostrarCarrito = () => {
        console.log(cart);
    }

    const handleCreate = async (products: Instrumento[]) => {
        console.log(products);
        const pedido : Pedido = {
            fechaPedido: new Date(),
            totalPedido: 0,
            titulo: "Pedido de instrumentos con monto de $" + products.reduce((total, product) => total + product.precio, 0)
        }
        pedido.totalPedido = products.reduce((total, product) => total + product.precio, 0);
        // let createdPedido : Pedido;
        // try{
        //     createdPedido = await createPedido(pedido);
        //     
        //     alert("Se ha creado el pedido");
        // } catch(error){
        //     alert("Error al crear el pedido, verifique la consola para obtener mas informacion");
        //     console.error(error);
        // }
        const detallesPedido: DetallePedido[] = products.map(product => ({
            cantidad: product.cantidadEnCarrito,  // Ajusta según la lógica de cantidad de tu aplicación
            instrumento: product,
            pedido: pedido
        }));
        
        console.log(detallesPedido);
        for (const detalle of detallesPedido) {
            try {
                const pedidoCreated : DetallePedido= await createDetalle(detalle);
                limpiarCarrito();
                alert("Se ha creado el pedido de " + pedidoCreated.instrumento.instrumento);
            } catch (error) {
                console.error(error);
            }
        }
    }
    return (
        <div className="cart-container">
            <label className="cart-label">Carrito</label>
            <ul className="cart-item-list">
                {cart.map((item) => (
                    <CartItem key={item.idinstrumento} {...item} />
                ))}
            </ul>
            <button onClick={limpiarCarrito} className="cart-button">Limpiar carrito</button>
            <button onClick={mostrarCarrito} className="cart-button">Mostrar carrito</button>
            <button onClick={() => handleCreate(cart)} className="cart-button">Crear pedido</button>
            <CheckoutMP montoCarrito={cart.reduce((total, product) => total + product.precio, 0)} />
        </div>
    );
}