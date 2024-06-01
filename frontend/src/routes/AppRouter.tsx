import { Route, Routes } from "react-router-dom"
import { useInstrumentos } from "../api/useInstrumentos"
import { Landing } from "../components/Landing"
import Header from "../components/Header"
import { Suspense, lazy } from "react"
import { RutaPrivada } from "../components/controlAcceso/RutaPrivada"
import LoaderPage from "../components/LoaderPage"
import LoginForm from "../components/LoginForm"
import RegisterForm from "../components/RegisterForm"
import { Logout } from "../components/Logout"

export const AppRouter = () => {

  const ListaInstrumentos = lazy(() => import('../components/ListaInstrumentos'));
  const DetalleInstrumento = lazy(() => import('../components/InstrumentoDetalle'));
  const Ubicacion = lazy(() => import('../components/Ubicacion'));

  return (
    <div>
      <Suspense fallback={<LoaderPage></LoaderPage>} >
        <Routes>
          <Route path='/instrumentos' element={
            <RutaPrivada>
              <Header />
              <ListaInstrumentos instrumentos={useInstrumentos()} />
            </RutaPrivada>
          } />
          <Route path='/instrumentos/:id' element={
            <RutaPrivada>
              <Header />
              <DetalleInstrumento />
            </RutaPrivada>
          } />
          <Route path='/ubicacion' element={
            <>
              <Header />
              <Ubicacion />
            </>
          } />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route index element={
            <>
              <Header />
              <Landing />
            </>
          } />
        </Routes>
      </Suspense>
    </div>
  )
}

