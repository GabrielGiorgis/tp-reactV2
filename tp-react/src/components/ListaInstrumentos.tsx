import React from 'react';
import { Instrumento } from '../data/datos';
import InstrumentoComponent from './Instrumento';
// import Header from './Header';

const ListaInstrumentos: React.FC<{ instrumentos: Instrumento[] }> = ({ instrumentos }) => {
  return (
    <>
      <div>
        {instrumentos.map((instrumento: Instrumento) => (
          <div key={instrumento.id}>
            <InstrumentoComponent instrumento={instrumento} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ListaInstrumentos;
