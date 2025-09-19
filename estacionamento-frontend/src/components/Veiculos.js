import React from "react";
import "../App.css";

function Veiculos({ veiculos }) {
  return (
    <div className="lista-veiculos">
      <h2>Veículos Estacionados</h2>
      {veiculos.length === 0 ? (
        <p>Nenhum veículo estacionado.</p>
      ) : (
        <ul>
          {veiculos.map((v, index) => (
            <li key={index}>{v}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Veiculos;

