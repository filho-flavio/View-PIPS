import "./RecursosDeSaude.css";
import GraficoClientela from "../../components/Graficos/GraficoClientela";
// import GraficoExpectativaVida from "../../components/Graficos/GraficoExpectativaVida";
// import GraficoAtendimentoClientela from "../../components/Graficos/GraficoAtendimentoClientela";
// import GraficoCapacidadeInfraestrutura from "../../components/Graficos/GraficoCapacidadeInfraestrutura";
import GraficoEvolucaoAtendimentosAnual from "../../components/Graficos/GraficoEvolucaoAnual";
import GraficoCapacidadeConsultoriosLeitos from "../../components/Graficos/GraficoCapacidadeConsultoriosLeitos";
import GraficoUnidadesSaude from "../../components/Graficos/GraficoUnidadesSaude";
import GraficoServicosSaude from "../../components/Graficos/GraficoServicosSaude";

const RecursosDeSaude = () => {
  return (
    <div className="tendencias-saude">
      <div className="header-tendencias-saude">
        <h2>Recursos de Saúde em Inhumas</h2>
      </div>
      <div className="box-graficos">
        <GraficoClientela />
        <GraficoEvolucaoAtendimentosAnual />
        <GraficoCapacidadeConsultoriosLeitos />
        <GraficoUnidadesSaude />
        <GraficoServicosSaude />
        {/* <GraficoCapacidadeInfraestrutura />
        <GraficoAtendimentoClientela />
        <GraficoExpectativaVida /> */}
      </div>
      {/* <ContentTop /> */}
    </div>
  );
};

export default RecursosDeSaude;
