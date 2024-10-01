import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // Para carregar automaticamente os gráficos

const GraficoEvolucaoAtendimentosAnual = () => {
  const [chartData, setChartData] = useState(null);
  const [selectedAno, setSelectedAno] = useState(""); // Estado para o ano selecionado
  const [anosDisponiveis, setAnosDisponiveis] = useState([]);

  const [chartOptions, setChartOptions] = useState({
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Evolução dos Atendimentos por Competência",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Competência",
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
    // Carregar os anos disponíveis no início
    fetch("http://localhost:5000/grafico/evolucao-atendimentos")
      .then((response) => response.json())
      .then((data) => {
        const anos = [...new Set(data.map((item) => item.Ano))]; // Extrair anos únicos
        setAnosDisponiveis(anos);
      })
      .catch((error) => {
        console.error("Erro ao carregar os anos:", error);
      });
  }, []);

  const carregarDadosGrafico = (ano) => {
    // Fazer a requisição para obter os dados do gráfico com base no ano selecionado
    const url = ano ? `http://localhost:5000/grafico/evolucao-atendimentos-ano?ano=${ano}` : "http://localhost:5000/grafico/evolucao-atendimentos";
    
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Transformar os dados para o formato utilizado pelo Chart.js
        const labels = data.map((item) => item.Competencia);
        const quantidade = data.map((item) => item.Total);

        setChartData({
          labels,
          datasets: [
            {
              label: `Quantidade de Atendimentos ${ano ? `em ${ano}` : ''}`,
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
  };

  useEffect(() => {
    // Carregar os dados do gráfico para o ano selecionado
    carregarDadosGrafico(selectedAno);
  }, [selectedAno]);

  const handleAnoChange = (event) => {
    setSelectedAno(event.target.value); // Atualizar o ano selecionado
  };

  return (
    <div className="grafico-evolucao-atendimentos">
      <h1>Evolução dos Atendimentos ao Longo das Competências</h1>

      {/* Seletor de Ano */}
      <div className="filtro-ano">
        <label htmlFor="anoSelect">Filtrar por Ano:</label>
        <select id="anoSelect" value={selectedAno} onChange={handleAnoChange}>
          <option value="">Todos os Anos</option>
          {anosDisponiveis.map((ano) => (
            <option key={ano} value={ano}>
              {ano}
            </option>
          ))}
        </select>
      </div>

      {chartData ? (
        <Line data={chartData} options={chartOptions} />
      ) : (
        <p>Carregando gráfico...</p>
      )}
    </div>
  );
};

export default GraficoEvolucaoAtendimentosAnual;
