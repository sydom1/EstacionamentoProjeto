using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace EstacionamentoAPI.Models
{
    public class Estacionamento
    {
        private decimal precoInicial = 0;
        private decimal precoPorHora = 0;
        private List<string> veiculos = new List<string>();

        public Estacionamento(decimal precoInicial, decimal precoPorHora)
        {
            this.precoInicial = precoInicial;
            this.precoPorHora = precoPorHora;
        }

        public string AdicionarVeiculo(string placa)
        {
            string placaNormalizada = placa.Replace("-", "").Trim().ToUpper();

            // Expressões regulares
            Regex regexPlacaAntiga = new Regex("^[A-Z]{3}[0-9]{4}$");
            Regex regexPlacaMercosul = new Regex("^[A-Z]{3}[0-9][A-Z][0-9]{2}$");

            if (!regexPlacaAntiga.IsMatch(placaNormalizada) && !regexPlacaMercosul.IsMatch(placaNormalizada))
                throw new Exception("Placa inválida! Digite no formato ABC1234 ou Mercosul ABC1D23.");

            if (veiculos.Contains(placaNormalizada))
                throw new Exception("Esse veículo já está estacionado.");

            veiculos.Add(placaNormalizada);
            return $"O veículo com a placa {placaNormalizada} foi estacionado com sucesso!";
        }

        public decimal RemoverVeiculo(string placa, int horas)
        {
            string placaNormalizada = placa.Replace("-", "").Trim().ToUpper();

            if (horas < 0)
                throw new Exception("A quantidade de horas deve ser maior ou igual a zero.");

            if (!veiculos.Contains(placaNormalizada))
                throw new Exception("Desculpe, esse veículo não está estacionado aqui.");

            decimal valorTotal = precoInicial + precoPorHora * horas;
            veiculos.Remove(placaNormalizada);
            return valorTotal;
        }

        public List<string> ListarVeiculos()
        {
            // Retorna cópia da lista para evitar manipulação externa
            return new List<string>(veiculos);
        }
    }
}