import { Route, Routes } from "react-router-dom"
import ListaInstrumentos from "../components/ListaInstrumentos"
import InstrumentosBack from "../components/InstrumentosBack"
import useInstrumentos from "../data/datos"
export const AppRouter = () => {
  
  return (
    <div>
      <Routes>
        <Route index element={<ListaInstrumentos instrumentos={useInstrumentos()}/>} />
        <Route path='/api/instrumentos' element={<InstrumentosBack/>} />
      </Routes>
    </div>
  )
}

