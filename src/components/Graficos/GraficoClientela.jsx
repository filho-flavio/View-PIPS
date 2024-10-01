import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // Para carregar automaticamente os gráficos

const GraficoClientela = () => {
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState({
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Evolução dos Atendimentos por Ano",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Ano",
        },
      },
      y: {
        title: {
          display: true,
          text: "Quantidade de Atendimentos",
        },
        beginAtZero: true,
      },
    },
  });

  useEffect(() => {
    // Fazer a requisição para obter os dados do gráfico
    fetch("http://127.0.0.1:5000/grafico/evolucao-atendimentos")
      .then((response) => response.json())
      .then((data) => {
        // Transformar os dados para o formato utilizado pelo Chart.js
        const labels = data.map((item) => item.Ano);
        const quantidade = data.map((item) => item.Total);

        setChartData({
          labels,
          datasets: [
            {
              label: "Quantidade de Atendimentos",
              data: quantidade,
              fill: false,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 2,
              tension: 0.1, // Curvatura da linha
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Erro ao carregar os dados do gráfico:", error);
      });
  }, []);

  return (
    <div className="grafico-evolucao-atendimentos">
      <h1>Evolução dos Atendimentos ao Longo dos Anos</h1>
      {chartData ? (
        <Line data={chartData} options={chartOptions} />
      ) : (
        <p>Carregando gráfico...</p>
      )}
    </div>
  );
};

export default GraficoClientela;
