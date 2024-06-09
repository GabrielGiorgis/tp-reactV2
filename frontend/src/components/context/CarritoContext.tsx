import { ReactNode, createContext, useState } from "react";
import { Instrumento } from "../../types/Instrumento";

interface CartContextType {
    cart: Instrumento[];
    addCarrito: (product: Instrumento) => void;
    removeCarrito: (product: Instrumento) => void;
    removeItemCarrito: (product: Instrumento) => void;
    limpiarCarrito: () => void;
}
//Determinar el constexto del carrito
export const CartContext = createContext<CartContextType>({
    cart: [],
    addCarrito: () => {},
    removeCarrito: () => {},
    removeItemCarrito: () => {},
    limpiarCarrito: () => {},
})
//Proveer el contexto del carrito
export function CarritoContextProvider({ children }: {children: ReactNode}) {

    const [cart, setCart] = useState<Instrumento[]>([]);

    const addCarrito = async (product: Instrumento) => {
        let existe:boolean = false;
        cart.forEach(async(element:Instrumento)=>{
            if(element.idinstrumento === product.idinstrumento){
                existe = true;
                return existe;
            }
        })
        if(existe){
            console.log("El instrumento ya se encuentra en el carrito");
            product.cantidadEnCarrito += 1;
            const cartClonado = await structuredClone(cart.filter(item=>item.idinstrumento !== product.idinstrumento));
            await cartClonado.push(product)
            setCart(cartClonado);
        }else{
            console.log("NO EXISTE");
            product.cantidadEnCarrito = 1;
            await setCart(prevCart=>[...prevCart, product]);

        }
    }
    const removeCarrito = async (product: Instrumento) => {
        await setCart(prevCart=>prevCart.filter(item=>item.idinstrumento !== product.idinstrumento));
    }
    const removeItemCarrito = async (product: Instrumento) => {
        let existe:boolean = false
        cart.forEach(async(element:Instrumento)=>{
            if(element.idinstrumento === product.idinstrumento){
                existe = true;
                return existe;
            }
        })
        if(existe){
            if (product.cantidadEnCarrito >= 1) {
                product.cantidadEnCarrito -= 1;
                const cartClonado = await structuredClone(cart.filter(item=>item.idinstrumento !== product.idinstrumento));
                await cartClonado.push(product)
                setCart(cartClonado);
            }
        }
    }
    const limpiarCarrito = async () => {
        setCart([]);
    }
    return (
        <CartContext.Provider value={{cart, addCarrito, removeCarrito, removeItemCarrito, limpiarCarrito}}>
            {children}
        </CartContext.Provider>
    )
}