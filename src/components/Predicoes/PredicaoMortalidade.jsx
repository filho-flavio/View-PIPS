import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';  // Chart.js auto-import

const PrevisaoMortesAnuaisFiltrada = () => {
    const [codCid10, setCodCid10] = useState('');
    const [sexo, setSexo] = useState('');
    const [faixaEtaria, setFaixaEtaria] = useState('');
    const [anos, setAnos] = useState(5);  // Anos a prever, com 5 como padrão
    const [previsao, setPrevisao] = useState(null);
    const [descricao, setDescricao] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Função para buscar a previsão de mortes
    const handlePrevisao = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://127.0.0.1:5000/previsao/mortes_filtrada', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Cod_CID_10: codCid10, sexo, faixa_etaria: faixaEtaria, anos_a_prever: anos })
            });

            if (!response.ok) {
                throw new Error('Erro ao obter a previsão.');
            }

            const data = await response.json();
            setPrevisao(data.previsao_mortes_proximos_anos);
            setDescricao(data.descricao_causa_obito);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Configuração do gráfico
    const data = {
        labels: previsao ? Object.keys(previsao) : [],
        datasets: [
            {
                label: 'Previsão de Mortes',
                data: previsao ? Object.values(previsao).map(val => val.toFixed(0)) : [],
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.6)',
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.1
            }
        ]
    };

    return (
        <div>
            <h2>Previsão de Mortes nos Próximos Anos</h2>
            <div>
                <label>Código CID-10:</label>
                <input
                    type="text"
                    value={codCid10}
                    onChange={(e) => setCodCid10(e.target.value)}
                    placeholder="Ex: I219"
                />
            </div>
            <div>
                <label>Sexo:</label>
                <select value={sexo} onChange={(e) => setSexo(e.target.value)}>
                    <option value="">Selecione o Sexo</option>
                    <option value="MASCULINO">Masculino</option>
                    <option value="FEMININO">Feminino</option>
                </select>
            </div>
            <div>
                <label>Faixa Etária:</label>
                <input
                    type="text"
                    value={faixaEtaria}
                    onChange={(e) => setFaixaEtaria(e.target.value)}
                    placeholder="Ex: 70 A 79 ANOS"
                />
            </div>
            <div>
                <label>Anos a Prever:</label>
                <input
                    type="number"
                    value={anos}
                    onChange={(e) => setAnos(e.target.value)}
                    placeholder="Ex: 5"
                />
            </div>
            <button onClick={handlePrevisao} disabled={loading}>
                {loading ? 'Carregando...' : 'Obter Previsão'}
            </button>

            {error && <p style={{ color: 'red' }}>Erro: {error}</p>}

            {previsao && (
                <div>
                    <h3>Previsão de Mortes por Ano</h3>
                    <Line data={data} />
                    <h4>Descrição da Causa de Óbito:</h4>
                    <p>{descricao}</p>
                </div>
            )}
        </div>
    );
};

export default PrevisaoMortesAnuaisFiltrada;
