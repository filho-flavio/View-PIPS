import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto"; // Para carregar automaticamente os gráficos

const GraficoObitosFaixaEtariaSexo = () => {
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
        text: "Distribuição de Óbitos por Faixa Etária e Sexo",
      },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Faixa Etária",
        },
      },
      y: {
        title: {
          display: true,
          text: "Número de Óbitos",
        },
        beginAtZero: true,
      },
    },
  });

  useEffect(() => {
    // Fazer a requisição para obter os dados do gráfico
    fetch("http://127.0.0.1:5000/grafico/distribuicao-obitos-faixa-etaria-sexo")
      .then((response) => response.json())
      .then((data) => {
        setChartData(data); // Definir os dados do gráfico
      })
      .catch((error) => {
        console.error("Erro ao carregar os dados do gráfico:", error);
      });
  }, []);

  return (
    <div className="grafico-evolucao-mortalidade">
      <h1>Distribuição de Óbitos por Faixa Etária e Sexo</h1>
      {chartData ? (
        <Bar data={chartData} options={chartOptions} />
      ) : (
        <p>Carregando gráfico...</p>
      )}
    </div>
  );
};

export default GraficoObitosFaixaEtariaSexo;
