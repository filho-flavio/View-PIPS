import { useEffect, useState } from 'react';

const GraficoExpectativaVida = () => {
  const [dadosExpectativa, setDadosExpectativa] = useState([]);

  useEffect(() => {
    // Faz a chamada à API para buscar os dados de expectativa de vida
    fetch('http://localhost:5000/grafico/expectativa-vida')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao carregar os dados de expectativa de vida');
        }
        return response.json();
      })
      .then((data) => {
        setDadosExpectativa(data);
        
      })
      .catch((error) => {
        console.error("Erro ao carregar os dados de expectativa de vida:", error);
      });
  }, []);

  return (
    <div>
      <h2>Expectativa de Vida por Município</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Município</th>
            <th>Expectativa de Vida</th>
          </tr>
        </thead>
        <tbody>
          {dadosExpectativa.map((item, index) => (
            <tr key={index}>
              <td>{item.Municipio_residencia}</td>
              <td>{item.expectativa_vida.toFixed(2)} anos</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GraficoExpectativaVida;
