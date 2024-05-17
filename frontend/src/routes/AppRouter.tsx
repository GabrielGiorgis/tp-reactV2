import { Route, Routes } from "react-router-dom"
import ListaInstrumentos from "../components/ListaInstrumentos"
import InstrumentosBack from "../components/InstrumentosBack"
import { useInstrumentos } from "../data/datos"
import DetalleInstrumento from "../components/InstrumentoDetalle"
import { Landing } from "../components/Landing"
import Header from "../components/Header"
import { Ubicacion } from "../components/Ubicacion"
export const AppRouter = () => {

  return (
    <div>
      <Header />
      <Routes>
        <Route path='/instrumentos/list' element={<ListaInstrumentos instrumentos={useInstrumentos()} />} />
        <Route path='/instrumentos/send-json' element={<InstrumentosBack />} />
        <Route path='/instrumentos/list/:id' element={<DetalleInstrumento />} />
        <Route path='/ubicacion' element={<Ubicacion />} />
        <Route index element={<Landing />} />
      </Routes>
    </div>
  )
}

