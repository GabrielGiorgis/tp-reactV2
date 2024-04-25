import React, { useState } from 'react';
import instrumentos from '../data/instrumentos.json';

const InstrumentosBack = () => {
    const [message, setMessage] = useState('');

    const handleFetchData = async () => {
        console.log("Enviando datos al servidor:", instrumentos.instrumentos);
        try {
            const response = await fetch('/api/instrumentos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(instrumentos.instrumentos),
            });
            console.log("Respuesta del servidor:", response);

            if (!response.ok) {
                throw new Error(`Error al enviar los datos: ${response.statusText}`);
            }

            const data = await response.json();
            setMessage(data.message);
            console.log("Datos insertados correctamente:", data.message);
        } catch (err:any) {
            console.error("Error al enviar los datos:", err.message);
            setMessage('Error al insertar los datos');
        }
    };

    return (
        <div>
            <button onClick={handleFetchData}>Enviar Datos</button>
            <div>{message}</div>
        </div>
    );
}

export default InstrumentosBack;
