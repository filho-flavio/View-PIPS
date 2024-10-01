import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // Import necessário para registrar os gráficos

const GraficoEvolucaoObitos = () => {
  const [dadosGrafico, setDadosGrafico] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fazer a requisição para a API Flask para obter os dados do gráfico
    fetch("http://localhost:5000/grafico/evolucao-obitos")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Erro ao carregar os dados do gráfico");
        }
      })
      .then((data) => {
        setDadosGrafico(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Carregando gráfico...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="grafico-evolucao-obitos-ano">
      <h2>Evolução de Óbitos ao Longo dos Anos</h2>
      {dadosGrafico && (
        <Line
          data={dadosGrafico}
          options={{
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Número de Óbitos",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Ano",
                },
              },
            },
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
              tooltip: {
                mode: "index",
                intersect: false,
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default GraficoEvolucaoObitos;
