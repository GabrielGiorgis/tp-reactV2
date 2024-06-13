import { useEffect, useState } from "react";
import { loadInstrumentosFromJson } from "../service/useInstrumentos";
import Usuario from "../types/Usuario";
import { UsuarioService } from "../service/UsuarioService";

const LoadJson = () => {
  const [message, setMessage] = useState("");
  const [usuario, setUsuario] = useState<Usuario>();
  const usuarioService = new UsuarioService();

  const handleLoadJson = async () => {
    try {
      await loadInstrumentosFromJson();
      setMessage("Datos cargados correctamente");
    } catch (error) {
      setMessage("Error al cargar los datos");
    }
  };

  useEffect(() => {
    const idUser = localStorage.getItem("idUser");
    if (idUser != null) {
      const fetchUsuario = async () => {
        const usuario = await usuarioService.getUsuarioByid(Number(idUser));
        if (usuario != undefined) setUsuario(usuario);
      };
      fetchUsuario();
    }
  }, []);

  return (
    <>
      {usuario &&
        (usuario.rol === "ADMINISTRADOR" || usuario.rol === "OPERADOR") && (
          <div>
            <button onClick={handleLoadJson}>Cargar datos del JSON</button>
            <p>{message}</p>
          </div>
        )}
    </>
  );
};

export default LoadJson;
