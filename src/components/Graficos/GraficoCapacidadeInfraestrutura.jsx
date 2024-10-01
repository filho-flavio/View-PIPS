import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const GraficoCapacidadeInfraestrutura = () => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/grafico/capacidade-infraestrutura")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setChartData(data);
        }
      })
      .catch(error => {
        console.error("Erro ao carregar os dados do gráfico:", error);
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div>
      <h2>Capacidade de Infraestrutura das Unidades de Saúde</h2>
      {chartData ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: "top"
              },
              title: {
                display: true,
                text: "Capacidade de Infraestrutura por Unidade"
              }
            }
          }}
        />
      ) : (
        <p>Carregando gráfico...</p>
      )}
    </div>
  );
};

export default GraficoCapacidadeInfraestrutura;
