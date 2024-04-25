import React, { useState } from 'react';
import instrumentos from '../data/instrumentos.json';

const InstrumentosBack = () => {
    const [message, setMessage] = useState('');

    const handleFetchData = async () => {
        try {
            for (const instrumento of instrumentos.instrumentos) {
              const response = await fetch('http://localhost:3000/api/instrumentos', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(instrumento),
              });

              if (!response.ok) {
                  throw new Error(`Error al enviar los datos: ${response.statusText}`);
              }

              const data = await response.json();
              setMessage(data.message);
              console.log("Datos insertados correctamente:", data.message);
            }
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
