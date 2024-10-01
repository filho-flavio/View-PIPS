import "./Previsoes.css"
import PreverCausasMorteInhumas from "../../components/Predicoes/PreverCausasMorteInhumas";
import GraficoPrevisaoAtendimento from "../../components/Graficos/GraficoPrevisaoAtendimento";

const Previsoes = () => {
  return (
    <div className="previsoes-saude">
      <div className="header-previsoes-saude">
        <h2>Previsões de Saúde em Inhumas</h2>
      </div>
      <div className="box-graficos"></div>
      <PreverCausasMorteInhumas />
      <GraficoPrevisaoAtendimento />
    </div>
  );
};

export default Previsoes;
