import { useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { createPreferenceMP } from "../api/useMp";
import PreferenceMP from "../types/PreferenceMP";
import "./StyleSheets/StyleCheckout.css"
initMercadoPago('');

export function CheckoutMP ({montoCarrito = 0}) {
    const [idPreference, setIdPreference] = useState<string>("");

    const getPreferenceMP = async () => {
        if(montoCarrito > 0) {
            const response:PreferenceMP = await createPreferenceMP({idPedido: 0, titulo:"Pedido de instrumentos", fechaPedido:new Date(), totalPedido: montoCarrito});
            console.log("Preference id: "+ response.id);
            if(response)
                setIdPreference(response.id);
        }else{
            alert("No hay instrumentos en el carrito");
        }
    }
    initMercadoPago('TEST-7e08b627-fbf4-4888-acf4-a0c7436a26a1', {locale: 'es-AR'});
    return (
        <div>
            <button onClick={getPreferenceMP} className="btn btn-primary" style={{display: 'block', margin: 'auto'}}>Pagar con <br/>Mercado Pago</button>
            <div className={idPreference ? 'divVisible' : 'divInvisible'}>
                <Wallet initialization={{ preferenceId: idPreference , redirectMode: 'blank'}} customization={{texts:{valueProp:'smart_option'}}} />
            </div>
        </div>
    );
}