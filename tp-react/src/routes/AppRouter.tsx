import { Route, Routes } from "react-router-dom"
import ListaInstrumentos from "../components/ListaInstrumentos"
import datos from "../data/datos"
export const AppRouter = () => {
  return (
    <div>
      <Routes>
        <Route index element={<ListaInstrumentos instrumentos={datos}/>} />
        <Route path="*" element={<ListaInstrumentos instrumentos={datos}/>} />
      </Routes>
    </div>
  )
}

