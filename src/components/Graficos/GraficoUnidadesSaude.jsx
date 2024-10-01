import  { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';  // Para carregar automaticamente os gráficos

const GraficoUnidadesSaude = () => {
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState({
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Distribuição de Tipos de Unidades de Saúde',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Tipos de Unidades de Saúde',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Total',
        },
        beginAtZero: true,
      },
    },
  });

  useEffect(() => {
    // Fazer a requisição para obter os dados do gráfico
    fetch('http://127.0.0.1:5000/grafico/unidades-saude')
      .then(response => response.json())
      .then(data => {
        setChartData(data);  // Definir os dados do gráfico
      })
      .catch(error => {
        console.error('Erro ao carregar os dados do gráfico:', error);
      });
  }, []);

  return (
    <div className='grafico-evolucao-taxas-mortalidade'>
      <h1>Distribuição de Tipos de Unidades de Saúde</h1>
      {chartData ? (
        <Bar data={chartData} options={chartOptions} />
      ) : (
        <p>Carregando gráfico...</p>
      )}
    </div>
  );
};

export default GraficoUnidadesSaude;
