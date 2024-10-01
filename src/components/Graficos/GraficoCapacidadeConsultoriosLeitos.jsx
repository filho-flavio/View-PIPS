import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto"; // Import necessário para carregar gráficos automaticamente

const GraficoCapacidadeConsultoriosLeitos = () => {
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
        text: "Capacidade de Consultórios e Leitos por Estabelecimento",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Estabelecimentos",
        },
      },
      y: {
        title: {
          display: true,
          text: "Capacidade",
        },
        beginAtZero: true,
      },
    },
  });

  useEffect(() => {
    // Fazer a requisição para obter os dados do gráfico
    fetch("http://127.0.0.1:5000/grafico/capacidade-consultorios-leitos")
      .then((response) => response.json())
      .then((data) => {
        console.log("Dados recebidos da API:", data); // Verificar os dados recebidos
        const labels = data.map((item) => item["Nome Fantasia"]);
        const consultorios = data.map((item) => item["Total Consultórios"]);
        const leitos = data.map((item) => item["Total Leitos"]);
  
        // Dados para o gráfico
        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Consultórios",
              data: consultorios,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
            {
              label: "Leitos",
              data: leitos,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
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
      <h1>Capacidade de Consultórios e Leitos por Estabelecimento</h1>
      {chartData ? (
        <Bar data={chartData} options={chartOptions} />
      ) : (
        <p>Carregando gráfico...</p>
      )}
    </div>
  );
};

export default GraficoCapacidadeConsultoriosLeitos;
