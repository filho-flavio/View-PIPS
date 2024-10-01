import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function GraficoPrevisaoAtendimento() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cid_10, setCid_10] = useState("I10");

  const opcoesCID = [
    { value: "I10", label: "Hipertensão essencial (primária)" },
    { value: "B342", label: "Doenças por vírus, de localização não especificada" },
    { value: "J439", label: "Enfisema" },
    { value: "C34", label: "Neoplasia maligna do pulmão" },
  ];

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/predicao/${cid_10}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
        setLoading(false);
      });
  }, [cid_10]);

  if (loading) {
    return <div>Carregando dados...</div>;
  }

  if (!data) {
    return <div>Erro ao carregar os dados.</div>;
  }

  const chartData = {
    labels: data.predicoes?.map((item) => item.ano),
    datasets: [
      {
        label: `Previsão de Óbitos (${data.descricao})`,
        data: data.predicoes?.map((item) => item.predicao_obitos),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: `Previsão de Atendimento para o CID-10 ${data.CID_10}`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Ano",
        },
      },
      y: {
        title: {
          display: true,
          text: "Número de Óbitos Previsto",
        },
        beginAtZero: true,
      },
    },
  };

  const handleChangeCid = (event) => {
    setCid_10(event.target.value);
    setLoading(true);
  };

  return (
    <div className="prev-mortes">
      <h1>Previsão de Aumento de Atendimento %</h1>

      {/* Dropdown para escolher o CID-10 */}
      <label htmlFor="cid_10_select">Escolha uma doença:</label>
      <select id="cid_10_select" value={cid_10} onChange={handleChangeCid}>
        {opcoesCID?.map((opcao) => (
          <option key={opcao.value} value={opcao.value}>
            {opcao.label}
          </option>
        ))}
      </select>

      <Line data={chartData} options={chartOptions} />
    </div>
  );
}

export default GraficoPrevisaoAtendimento;
