import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const GraficoTaxasMortalidade = () => {
  const [dadosGrafico, setDadosGrafico] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fazer a requisição para a API Flask para obter os dados do gráfico
    fetch("http://localhost:5000/grafico/taxas-mortalidade")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Erro ao carregar os dados do gráfico");
        }
      })
      .then((data) => {
        setDadosGrafico(data);
        
        console.log(data);
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
    <div className="grafico-evolucao-taxas-mortalidade">
      <h2>Taxas de Mortalidade (2013-2017)</h2>
      {dadosGrafico && (
        <Line
          data={dadosGrafico}
          options={{
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Taxa de Mortalidade",
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

export default GraficoTaxasMortalidade;
