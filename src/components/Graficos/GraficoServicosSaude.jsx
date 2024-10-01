import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto"; // Carrega os tipos de gráficos automaticamente

const GraficoServicosSaude = () => {
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
        text: "Quantidade de Serviços de Saúde em Inhumas",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Tipo de Serviço",
        },
      },
      y: {
        title: {
          display: true,
          text: "Quantidade",
        },
        beginAtZero: true,
      },
    },
  });

  useEffect(() => {
    // Fazer a requisição para obter os dados do gráfico
    fetch("http://127.0.0.1:5000/grafico/servicos-saude")
      .then((response) => response.json())
      .then((data) => {
        setChartData({
          labels: data.labels,
          datasets: data.datasets,
        });
      })
      .catch((error) => {
        console.error("Erro ao carregar os dados do gráfico:", error);
      });
  }, []);

  return (
    <div className="grafico-evolucao-atendimentos">
      <h1>Quantidade de Serviços de Saúde em Inhumas</h1>
      {chartData ? (
        <Bar data={chartData} options={chartOptions} />
      ) : (
        <p>Carregando gráfico...</p>
      )}
    </div>
  );
};

export default GraficoServicosSaude;
