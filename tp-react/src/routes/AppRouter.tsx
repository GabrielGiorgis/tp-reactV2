import { Route, Routes } from "react-router-dom"
import ListaInstrumentos from "../components/ListaInstrumentos"
import datos from "../data/datos"
import InstrumentosBack from "../components/InstrumentosBack"
export const AppRouter = () => {
  return (
    <div>
      <Routes>
        <Route index element={<ListaInstrumentos instrumentos={datos}/>} />
        <Route path='/api/instrumentos' element={<InstrumentosBack/>} />
      </Routes>
    </div>
  )
}

