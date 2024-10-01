import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Para carregar automaticamente os gráficos

const GraficoEvolucaoSRAG = () => {
    const [chartData, setChartData] = useState(null);
    const [chartOptions, setChartOptions] = useState({
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top'
            },
            title: {
                display: true,
                text: 'Evolução dos Casos de SRAG em Inhumas ao Longo dos Anos'
            },
            tooltip: {
                enabled: true,
                mode: 'index',
                intersect: false
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Ano de Sintomas'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Número de Casos'
                },
                beginAtZero: true
            }
        }
    });

    useEffect(() => {
        // Fazer a requisição para obter os dados do gráfico
        fetch('http://127.0.0.1:5000/grafico/evolucao-srag-inhumas')
            .then(response => response.json())
            .then(data => {
                setChartData(data); // Definir os dados do gráfico
            })
            .catch(error => {
                console.error("Erro ao carregar os dados do gráfico:", error);
            });
    }, []);

    return (
        <div className='grafico-evolucao-srag'>
            <h1>Evolução dos Casos de SRAG em Inhumas</h1>
            {chartData ? (
                <Line data={chartData} options={chartOptions} />
            ) : (
                <p>Carregando gráfico...</p>
            )}
        </div>
    );
};

export default GraficoEvolucaoSRAG;
