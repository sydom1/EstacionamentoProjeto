import React, { useState, useEffect } from "react";
import Veiculos from "./components/Veiculos";
import AdicionarVeiculo from "./components/AdicionarVeiculo";
import RemoverVeiculo from "./components/RemoverVeiculo";
import { getVeiculos } from "./services/api";
import ConfigurarEstacionamento from "./components/ConfigurarEstacionamento";
import "./App.css"; // Importa o CSS

function App() {
  const [veiculos, setVeiculos] = useState([]);

  const atualizarLista = async () => {
    const lista = await getVeiculos();
    setVeiculos(lista);
  };

  useEffect(() => {
    atualizarLista();
  }, []);

  return (
    <div className="App">
      <div className="header">
        <img 
          src="/carro.png"
          alt="logo do Estacionamento"
          className="logo"
        />
        <h1>Estacione Já</h1>

        {/* Ícone engrenagem */}
        <ConfigurarEstacionamento />
      </div>

      <div className="veiculos-container">
        <AdicionarVeiculo atualizarLista={atualizarLista} />
        <RemoverVeiculo atualizarLista={atualizarLista} />
      </div>

      <Veiculos veiculos={veiculos} />
    </div>
  );
}

export default App;

