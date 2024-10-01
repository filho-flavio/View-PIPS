import { useState } from 'react';

const AnaliseExpectativaVida = () => {
    const [modelo, setModelo] = useState('linear');  // Modelo escolhido (padrão: linear)
    const [mse, setMse] = useState(null);  // Mean Squared Error (MSE) do modelo
    const [mensagem, setMensagem] = useState('');  // Mensagem de sucesso ou erro
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Função para enviar a requisição de análise de expectativa de vida
    const handleAnalise = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://127.0.0.1:5000/analise/expectativa_vida', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ modelo })
            });

            if (!response.ok) {
                throw new Error('Erro ao realizar a análise.');
            }

            const data = await response.json();
            console.log(data);
            
            setMse(data.mse);
            setMensagem(data.mensagem);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Análise de Expectativa de Vida</h2>
            
            <div>
                <label>Selecione o Modelo:</label>
                <select value={modelo} onChange={(e) => setModelo(e.target.value)}>
                    <option value="linear">Regressão Linear Múltipla</option>
                    <option value="arvore">Árvore de Decisão</option>
                </select>
            </div>
            
            <button onClick={handleAnalise} disabled={loading}>
                {loading ? 'Carregando...' : 'Executar Análise'}
            </button>

            {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
            {mensagem && <p>{mensagem}</p>}
            {mse && <p><strong>Erro Quadrático Médio (MSE):</strong> {mse}</p>}
        </div>
    );
};

export default AnaliseExpectativaVida;
