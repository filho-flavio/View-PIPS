import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';  // Importa automaticamente os componentes necessários para Chart.js

const GraficoDistribuicaoTemporal = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        // Fazer a requisição para a API Flask para obter os dados do gráfico
        fetch('http://localhost:5000/grafico/distribuicao-temporal')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao obter os dados');
                }
                return response.json();
            })
            .then(data => {
                console.log('Dados recebidos:', data); // Adicione este console.log
                setChartData(data);
            })
            .catch(error => {
                console.error("Erro ao carregar os dados do gráfico:", error);
            });
    }, []);
    

    return (
        <div className='line'>
            <h1>Distribuição de Casos por Semana Epidemiológica</h1>
            {chartData ? (
                <Bar data={chartData} options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Distribuição de Casos por Semana Epidemiológica',
                        },
                    },
                }} />
            ) : (
                <p>Carregando gráfico...</p>
            )}
        </div>
    );
};

export default GraficoDistribuicaoTemporal;
