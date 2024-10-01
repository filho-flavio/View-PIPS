import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Home from "../pages/Home";
import TendenciasSaudePage from "../pages/TendenciasSaude";
import RecursosDeSaudePage from "../pages/RecursosDeSaude";
import PrevisoesSaudePage from "../pages/PrevisoesSaude";

const RoutesApp = () => {
  return (
    <Router>
      <Routes>
        {/* Rota de registro disponível apenas para usuários não autenticados */}
        {/* {!user && <Route path="/" element={<Register />} />} */}

        {/* Rotas protegidas */}
        <Route
          path="/*"
          element={
            <>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/home" element={<Home />} />
                <Route path="/tendencias-saude" element={<TendenciasSaudePage />} />
                <Route path="/recursos-saude" element={<RecursosDeSaudePage />} />
                <Route path="/previsoes-saude" element={<PrevisoesSaudePage />} />
              </Routes>
            </>
          }
        />
        {/* {user && (
        )} */}

        {/* Redirecionar usuários autenticados para a página inicial */}
        {/* {user && <Route path="/*" element={<Navigate to="/home" />} />} */}
      </Routes>
    </Router>
  );
};

export default RoutesApp;
