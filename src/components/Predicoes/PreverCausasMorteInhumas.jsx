import { useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const PreverCausasMorteInhumas = () => {
  const [anos, setAnos] = useState(5); // Anos a prever, com 5 como padrão
  const [topCausas, setTopCausas] = useState(5); // Top N causas de morte, com 5 como padrão
  const [faixaEtaria, setFaixaEtaria] = useState(""); // Filtro de faixa etária
  const [sexo, setSexo] = useState(""); // Filtro de sexo
  const [previsoes, setPrevisoes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Função para buscar a previsão das principais causas de morte
  const handlePrevisao = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/previsao/causas_morte_inhumas",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            anos_a_prever: anos,
            top_n_causas: topCausas,
            faixa_etaria: faixaEtaria,
            sexo: sexo,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao obter a previsão.");
      }

      const data = await response.json();
      setPrevisoes(data.top_causas);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Configuração do gráfico
  const data = {
    labels: previsoes ? previsoes.map((causa) => `CID-${causa[0]}`) : [],
    datasets: [
      {
        label: "Previsão de Mortes",
        data: previsoes
          ? previsoes.map((causa) => causa[1].previsao.toFixed(0))
          : [],
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="prev-mortes">
      <h2>Previsão das Principais Causas de Morte em Inhumas</h2>
      <div className="header-prev-mortes">
        <div className="column">
          <label>Anos a Prever:</label>
          <input
            type="number"
            value={anos}
            onChange={(e) => setAnos(e.target.value)}
            placeholder="Ex: 5"
          />
        </div>
        <div className="column">
          <label>Top Causas de Morte:</label>
          <input
            type="number"
            value={topCausas}
            onChange={(e) => setTopCausas(e.target.value)}
            placeholder="Ex: 5"
          />
        </div>
        <div className="column">
          <label>Faixa Etária:</label>
          <input
            type="text"
            value={faixaEtaria}
            onChange={(e) => setFaixaEtaria(e.target.value)}
            placeholder="Ex: 70 A 79 ANOS"
          />
        </div>
        <div className="column">
          <label>Sexo:</label>
          <select value={sexo} onChange={(e) => setSexo(e.target.value)}>
            <option value="">Selecione o Sexo</option>
            <option value="MASCULINO">Masculino</option>
            <option value="FEMININO">Feminino</option>
          </select>
        </div>

        <button onClick={handlePrevisao} disabled={loading}>
          {loading ? "Carregando..." : "Obter Previsão"}
        </button>
      </div>

      {error && <p style={{ color: "red" }}>Erro: {error}</p>}

      {previsoes && (
        <div>
          <h3>Previsão de Mortes por Causa (Top {topCausas})</h3>
          <Bar data={data} />
          <ul className="ul-desc-prev-mortes">
            {previsoes.map((causa, index) => (
              <li className="li-desc-prev-mortes" key={index}>
                <strong>CID-{causa[0]}</strong>
                <br />
                <strong>Descrição:</strong> {causa[1].descricao}
                <br />
                <strong>Faixa Etária:</strong> {causa[1].faixa_etaria}
                <br />
                <strong>Sexo:</strong> {causa[1].sexo}
                <br />
                <strong>Previsão de Mortes:</strong>{" "}
                {causa[1].previsao.toFixed(0)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PreverCausasMorteInhumas;
