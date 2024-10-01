import "./TendenciasSaude.css";
//import ContentTop from "../../components/ContentTop/ContentTop";
import GraficoEvolucaoDengue from "../../components/Graficos/GraficoEvolucaoDengue";
import GraficoEvolucaoSRAG from "../../components/Graficos/GraficoEvolucaoSRAG";
import GraficoEvolucaoNascimentos from "../../components/Graficos/GraficoEvolucaoNascimentos";
import GraficoObitosFaixaEtariaSexo from "../../components/Graficos/GraficoObitosFaixaEtariaSexo";
import GraficoCausasMorteCID10 from "../../components/Graficos/GraficoCausasMorteCID10";
import GraficoEvolucaoObitos from "../../components/Graficos/GraficoEvolucaoObitos";
import GraficoTaxasMortalidade from "../../components/Graficos/GraficoTaxasMortalidade";

const TendenciasSaude = () => {
  return (
    <div className="tendencias-saude">
      <div className="header-tendencias-saude">
        <h2>Tendências de Saúde em Inhumas</h2>
      </div>
      <div className="box-graficos">
        <GraficoEvolucaoDengue />
        <GraficoEvolucaoSRAG />
        <GraficoEvolucaoNascimentos />
        <GraficoObitosFaixaEtariaSexo />
        <GraficoCausasMorteCID10 />
        <GraficoEvolucaoObitos />
        <GraficoTaxasMortalidade />
      </div>
      {/* <ContentTop /> */}
    </div>
  );
};

export default TendenciasSaude;
