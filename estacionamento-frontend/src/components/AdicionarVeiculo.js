import React, { useState } from "react";
import { adicionarVeiculo } from "../services/api";
import "../App.css"; // importar o CSS

function AdicionarVeiculo({ atualizarLista }) {
  const [placa, setPlaca] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleAdicionar = async () => {
    try {
      const res = await adicionarVeiculo(placa);
      setMensagem(res.mensagem);
      if (res.sucesso) {
        setPlaca(""); // limpa input apenas se sucesso
        atualizarLista(); // atualiza lista no App.js
      }
    } catch (err) {
      setMensagem(err.response?.data?.mensagem || "Erro desconhecido");
    }
  };

  return (
    <div className="adicionar-veiculo">
      <h2>Adicionar Veículo</h2>
      
      <div className="linha-input">
      <input
        type="text"
        value={placa}
        placeholder="Digite a placa"
        onChange={(e) => setPlaca(e.target.value)}
      />
      <button onClick={handleAdicionar}>Adicionar</button>
      </div>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default AdicionarVeiculo;


/*setPlaca atualiza o valor do input conforme você digita.
handleAdicionar chama o POST da API e trata erros.
mensagem mostra feedback do backend*/ 