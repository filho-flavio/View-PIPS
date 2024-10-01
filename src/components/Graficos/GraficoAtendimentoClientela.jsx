import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const GraficoAtendimentoClientela = () => {
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
        text: "Tipos de Atendimento e Fluxo de Clientela",
      },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Tipo de Atendimento",
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Quantidade",
        },
      },
    },
  });

  useEffect(() => {
    // Fazer a requisição para obter os dados do gráfico
    fetch("http://127.0.0.1:5000/grafico/atendimento-clientela")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Dados recebidos:", data);  // Adicionar log para verificar os dados
        // Processar os dados para o gráfico de barras empilhadas
        const tiposDeAtendimento = [...new Set(data.map(item => item['Tipo de Atendimento']))];
        const fluxoDeClientela = [...new Set(data.map(item => item['Fluxo de Clientela']))];
  
        const datasets = fluxoDeClientela.map((fluxo) => ({
          label: fluxo,
          data: tiposDeAtendimento.map((tipo) =>
            data
              .filter((item) => item['Tipo de Atendimento'] === tipo && item['Fluxo de Clientela'] === fluxo)
              .reduce((acc, curr) => acc + curr.quantidade, 0)
          ),
          backgroundColor: getRandomColor(),
        }));
  
        setChartData({
          labels: tiposDeAtendimento,
          datasets: datasets,
        });
      })
      .catch((error) => {
        console.error("Erro ao carregar os dados do gráfico:", error);
      });
  }, []);
  

  // Função para gerar cores aleatórias
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="grafico-atendimento-clientela">
      <h1>Tipos de Atendimento e Fluxo de Clientela</h1>
      {chartData ? (
        <Bar data={chartData} options={chartOptions} />
      ) : (
        <p>Carregando gráfico...</p>
      )}
    </div>
  );
};

export default GraficoAtendimentoClientela;
