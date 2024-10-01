import Sidebar from "../layout/Sidebar/Sidebar";
import TendenciasSaude from "../layout/TendenciasSaude/TendenciasSaude";

const TendenciasSaudePage = () => {
  return (
    <>
      <div className="app">
        <Sidebar />
        <TendenciasSaude />
      </div>
    </>
  );
};

export default TendenciasSaudePage;
