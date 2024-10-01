import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto"; // Para carregar automaticamente os gráficos

const GraficoCausasMorteCID10 = () => {
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
        text: "Causas de Morte mais Comuns (CID-10)",
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
          text: "Códigos CID-10",
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
    fetch("http://127.0.0.1:5000/grafico/causas-morte-cid10")
      .then((response) => response.json())
      .then((data) => {
        setChartData(data); // Definir os dados do gráfico
      })
      .catch((error) => {
        console.error("Erro ao carregar os dados do gráfico:", error);
      });
  }, []);

  return (
    <div className="grafico-evolucao-causas-morte">
      <h1>Causas de Morte mais Comuns (CID-10)</h1>
      {chartData ? (
        <Bar data={chartData} options={chartOptions} />
      ) : (
        <p>Carregando gráfico...</p>
      )}
    </div>
  );
};

export default GraficoCausasMorteCID10;
