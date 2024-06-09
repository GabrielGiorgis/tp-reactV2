import { useEffect, useState } from "react";

export const useChartBar = () => {
  const [chartData, setChartData] = useState([]);
  const url = "http://localhost:8080";

  useEffect(() => {
    const fetchChartBar = async () => {
      try {
        const response = await fetch(url + "/api/pedidos/datachartbar");
        if (!response.ok) {
          throw new Error("Error al obtener los datos del gráfico de barras");
        }
        const data = await response.json();
        setChartData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchChartBar();
  }, []);

  return chartData;

};

export const useChartPie = () => {
  const [chartData, setChartData] = useState([]);
  const url = "http://localhost:8080";

  useEffect(() => {
    const fetchChartPie = async () => {
      try {
        const response = await fetch(url + "/api/pedidos/datachartpie");
        if (!response.ok) {
          throw new Error("Error al obtener los datos de los pedidos");
        }
        const data = await response.json();
        setChartData(data);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchChartPie();

  }, []);

  return chartData;

};
