import React from 'react';
import { Instrumento } from '../data/datos'; 
import InstrumentoComponent from './Instrumento';

const ListaInstrumentos: React.FC<{ instrumentos: Instrumento[] }> = ({ instrumentos }) => {
  return (
    <div>
      {instrumentos.map((instrumento: Instrumento) => (
        <div key={instrumento.id}>
          <InstrumentoComponent instrumento={instrumento} />
        </div>
      ))}
    </div>
  );
};

export default ListaInstrumentos;
