import Chart from "react-google-charts";
import { useChartBar, useChartPie } from "../api/useCharts";
import { useEffect, useState } from "react";
import Usuario from "./entidades/Usuario";
import { UsuarioService } from "./service/UsuarioService";

const GoogleCharts = () => {
  const chartDataBar = useChartBar();
  const chartDataPie = useChartPie();

  const [usuario, setUsuario] = useState<Usuario>();
  const usuarioService = new UsuarioService();

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
        (usuario.rol === "ADMINISTRADOR") && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1>Estadísticas</h1>
            <Chart
              chartType="BarChart"
              width="100%"
              height="400px"
              data={chartDataBar}
              options={{
                title: "Cantidad de Pedidos por Mes y Año",
                chartArea: { width: "50%" },
                hAxis: {
                  title: "Cantidad de Pedidos",
                  minValue: 0,
                },
                vAxis: {
                  title: "Mes-Año",
                },
              }}
            />
            <Chart
              chartType="PieChart"
              width="100%"
              height="400px"
              data={chartDataPie}
              options={{
                title: "Cantidad de Pedidos por Instrumento",
              }}
            />
          </div>
        )}
    </>
  );
};

export default GoogleCharts;
