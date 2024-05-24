import { createPedido } from "../api/usePedido";
import { useCarrito } from "../hooks/useCarrito";
import { Instrumento } from "../types/Instrumento";
import { Pedido } from "../types/Pedido";
import "./StyleSheets/StyleCart.css"

function CartItem(item: Instrumento) {
    return (
        <div className="cart-item" key={item.idinstrumento}>
            <img className="cart-item-image" src={item.imagen} alt={item.instrumento} />
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
            instrumentos: []
        }
        pedido.instrumentos = products; 
        try{
            await createPedido(pedido);
            limpiarCarrito();
            alert("Se ha creado el pedido");
        } catch(error){
            alert("Error al crear el pedido, verifique la consola para obtener mas informacion");
            console.error(error);
        }
    }
    return (
        <><div style={{
            bottom: "80px",
            right: "20px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
        }}>
            <label>Carrito</label>
            <ul>
                {cart.map((item: Instrumento) => <CartItem key={item.idinstrumento} {...item}/>)}
            </ul>
            <button onClick={limpiarCarrito}>Limpiar carrito</button>
            <button onClick={mostrarCarrito}>Mostrar carrito</button>
            <button onClick={() => handleCreate(cart)}>Crear pedido</button>
        </div>
        </>
    )
}