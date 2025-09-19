import axios from "axios";

// Cria instância do axios com a URL base da sua API
const api = axios.create({
  baseURL: "http://localhost:5269/api/Estacionamento" // use http para rodar localmente
});

// ----------------------- VEÍCULOS -----------------------

// Função para listar veículos
export const getVeiculos = async () => {
  const response = await api.get("/");
  return response.data.dados; // retorna apenas o array de veículos
};

// Função para adicionar veículo
export const adicionarVeiculo = async (placa) => {
  const response = await api.post(
    "/",
    { placa },
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data; // retorna { sucesso, mensagem }
};

// Função para remover veículo
export const removerVeiculo = async (placa, horas) => {
  const response = await api.delete(`/${placa}/${horas}`);
  return response.data; // retorna { sucesso, mensagem, total }
};

// ----------------------- CONFIGURAÇÃO DO ESTACIONAMENTO -----------------------

// Função para configurar preços do estacionamento
export const configurarEstacionamento = async (precoInicial, precoPorHora) => {
  try {
    const response = await api.post("/configurar", {
      precoInicial,
      precoPorHora
    });
    return response.data; // retorna { sucesso, mensagem }
  } catch (err) {
    throw err;
  }
};
