import { useState } from 'react';

const PrevisaoExpectativaVida = () => {
    const [totalObitos, setTotalObitos] = useState('');
    const [idadeMedia, setIdadeMedia] = useState('');
    const [ano, setAno] = useState('');
    const [faixaEtaria, setFaixaEtaria] = useState('');
    const [sexo, setSexo] = useState('');
    const [previsao, setPrevisao] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Função para enviar os dados para o backend e receber a previsão
    const handlePrevisao = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://127.0.0.1:5000/previsao/expectativa_vida', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    total_obitos: totalObitos,
                    idade_media: idadeMedia,
                    ano: ano,
                    faixa_etaria: faixaEtaria,
                    sexo: sexo
                })
            });

            if (!response.ok) {
                throw new Error('Erro ao obter a previsão.');
            }

            const data = await response.json();
            console.log(data);
            
            setPrevisao(data.previsao_expectativa_vida);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Previsão de Expectativa de Vida</h2>

            <div>
                <label>Total de Óbitos:</label>
                <input
                    type="number"
                    value={totalObitos}
                    onChange={(e) => setTotalObitos(e.target.value)}
                    placeholder="Ex: 150"
                />
            </div>
            <div>
                <label>Idade Média:</label>
                <input
                    type="number"
                    value={idadeMedia}
                    onChange={(e) => setIdadeMedia(e.target.value)}
                    placeholder="Ex: 65"
                />
            </div>
            <div>
                <label>Ano:</label>
                <input
                    type="number"
                    value={ano}
                    onChange={(e) => setAno(e.target.value)}
                    placeholder="Ex: 2024"
                />
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
                <label>Sexo:</label>
                <select value={sexo} onChange={(e) => setSexo(e.target.value)}>
                    <option value="">Selecione o Sexo</option>
                    <option value="MASCULINO">Masculino</option>
                    <option value="FEMININO">Feminino</option>
                </select>
            </div>

            <button onClick={handlePrevisao} disabled={loading}>
                {loading ? 'Carregando...' : 'Obter Previsão'}
            </button>

            {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
            {previsao && (
                <div>
                    <h3>Previsão de Expectativa de Vida: {previsao.toFixed(2)} anos</h3>
                </div>
            )}
        </div>
    );
};

export default PrevisaoExpectativaVida;
