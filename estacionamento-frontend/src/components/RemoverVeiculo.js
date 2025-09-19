import React, { useState } from "react";
import { removerVeiculo } from "../services/api";
import "../App.css"; // importar o CSS

function RemoverVeiculo({ atualizarLista }) {
  const [placa, setPlaca] = useState("");
  const [horas, setHoras] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleRemover = async () => {
    try {
      const res = await removerVeiculo(placa, Number(horas));
      setMensagem(
        res.mensagem +
          (res.total ? ` Total: R$ ${res.total.toFixed(2)}` : "")
      );
      if (res.sucesso) {
        setPlaca("");
        setHoras("");
        atualizarLista(); // atualiza lista no App.js
      }
    } catch (err) {
      setMensagem(err.response?.data?.mensagem || "Erro desconhecido");
    }
  };

  return (
    <div className="remover-veiculo">
      <h2>Remover Veículo</h2>

      {/* inputs lado a lado */}
      <div className="linha-remover">
        <input
          type="text"
          value={placa}
          placeholder="Digite a placa"
          onChange={(e) => setPlaca(e.target.value)}
        />
        <input
          type="number"
          value={horas}
          placeholder="Horas estacionado"
          onChange={(e) => setHoras(e.target.value)}
        />
      </div>

      {/* botão embaixo */}
      <button onClick={handleRemover}>Remover</button>

      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default RemoverVeiculo;


/*Pega placa e horas do usuário.
Chama o DELETE da API.
Mostra mensagem de sucesso ou erro*/