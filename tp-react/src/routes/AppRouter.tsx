import { Route, Routes } from "react-router-dom"
import ListaInstrumentos from "../components/ListaInstrumentos"
import InstrumentosBack from "../components/InstrumentosBack"
import { useInstrumentos } from "../data/datos"
import DetalleInstrumento from "../components/InstrumentoDetalle"
import { Landing } from "../components/Landing"
export const AppRouter = () => {

  return (
    <div>
      <Routes>
        <Route path='/instrumentos' element={<ListaInstrumentos instrumentos={useInstrumentos()} />} />
        <Route path='/api/instrumentos' element={<InstrumentosBack />} />
        <Route path='/instrumento/:id' element={<DetalleInstrumento />} />
        <Route index element={<Landing />} />
      </Routes>
    </div>
  )
}

