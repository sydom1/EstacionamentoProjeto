using EstacionamentoAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Text.RegularExpressions;

namespace EstacionamentoAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EstacionamentoController : ControllerBase
    {
        private static Estacionamento estacionamento = new Estacionamento(5, 2); // valores padrão

        // GET: lista os veículos estacionados
        [HttpGet]
        public IActionResult ListarVeiculos()
        {
            var veiculos = estacionamento.ListarVeiculos();
            return Ok(new
            {
                sucesso = true,
                mensagem = "Lista de veículos obtida com sucesso",
                dados = veiculos
            });
        }

        // POST: adiciona um veículo, recebendo a placa no corpo da requisição
        [HttpPost]
        public IActionResult AdicionarVeiculo([FromBody] VeiculoDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { sucesso = false, mensagem = "Placa inválida" });
            }

            try
            {
                // Normaliza a placa: remove hífen, espaços e deixa maiúscula
                string placaNormalizada = dto.Placa.Replace("-", "").Trim().ToUpper();

                // Valida o formato usando regex
                Regex regexPlacaAntiga = new Regex("^[A-Z]{3}[0-9]{4}$");
                Regex regexPlacaMercosul = new Regex("^[A-Z]{3}[0-9][A-Z][0-9]{2}$");

                if (!regexPlacaAntiga.IsMatch(placaNormalizada) && !regexPlacaMercosul.IsMatch(placaNormalizada))
                {
                    return BadRequest(new { sucesso = false, mensagem = "Placa inválida! Use formato ABC1234 ou Mercosul ABC1D23." });
                }

                var mensagem = estacionamento.AdicionarVeiculo(placaNormalizada);
                return Ok(new { sucesso = true, mensagem });
            }
            catch (Exception ex)
            {
                return BadRequest(new { sucesso = false, mensagem = ex.Message });
            }
        }

        // DELETE: remove o veículo, recebendo a placa e a quantidade de horas na URL
        [HttpDelete("{placa}/{horas}")]
        public IActionResult RemoverVeiculo(string placa, int horas)
        {
            try
            {
                // Normaliza a placa
                string placaNormalizada = placa.Replace("-", "").Trim().ToUpper();

                var valor = estacionamento.RemoverVeiculo(placaNormalizada, horas);
                return Ok(new
                {
                    sucesso = true,
                    mensagem = $"Veículo removido com sucesso",
                    total = valor
                });
            }
            catch (Exception ex)
            {
                return NotFound(new { sucesso = false, mensagem = ex.Message });
            }
        }

        // POST: atualiza os valores de configuração do estacionamento
        [HttpPost("configurar")]
        public IActionResult Configurar([FromBody] ConfiguracaoDTO dto)
        {
            if (dto.PrecoInicial < 0 || dto.PrecoPorHora < 0)
            {
                return BadRequest(new { sucesso = false, mensagem = "Os valores devem ser maiores ou iguais a zero." });
            }

            estacionamento = new Estacionamento(dto.PrecoInicial, dto.PrecoPorHora);

            return Ok(new
            {
                sucesso = true,
                mensagem = $"Configuração atualizada com sucesso! Preço Inicial: R$ {dto.PrecoInicial}, Preço por Hora: R$ {dto.PrecoPorHora}"
            });
        }
    }
}
