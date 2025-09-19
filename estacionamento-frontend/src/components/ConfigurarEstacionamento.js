import React, { useState } from "react";
import { configurarEstacionamento } from "../services/api";
import "../App.css";

function ConfigurarEstacionamento() {
  const [precoInicial, setPrecoInicial] = useState("");
  const [precoPorHora, setPrecoPorHora] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [mostrar, setMostrar] = useState(false); // controla se mostra o painel

  const handleSalvar = async () => {
    try {
      const res = await configurarEstacionamento(Number(precoInicial), Number(precoPorHora));
      setMensagem(res.mensagem);
      setPrecoInicial("");
      setPrecoPorHora("");
      setMostrar(false); // fecha painel depois de salvar
    } catch (err) {
      setMensagem(err.response?.data?.mensagem || "Erro ao salvar configuração");
    }
  };

  return (
    <div className="config-container">
      {/* Ícone engrenagem */}
      <button className="config-icone" onClick={() => setMostrar(!mostrar)}>
        ⚙️
      </button>

      {/* Painel aparece só quando clicar na engrenagem */}
      {mostrar && (
        <div className="config-card">
          <h2>Configurar Estacionamento</h2>
          <input
            type="number"
            placeholder="Preço Inicial"
            value={precoInicial}
            onChange={(e) => setPrecoInicial(e.target.value)}
          />
          <input
            type="number"
            placeholder="Preço por Hora"
            value={precoPorHora}
            onChange={(e) => setPrecoPorHora(e.target.value)}
          />
          <button onClick={handleSalvar}>Salvar</button>
          {mensagem && <p>{mensagem}</p>}
        </div>
      )}
    </div>
  );
}

export default ConfigurarEstacionamento;
