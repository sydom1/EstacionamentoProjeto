namespace EstacionamentoAPI.Models
{
    public class ConfiguracaoDTO
    {
        // Valor fixo cobrado ao entrar no estacionamento
        public decimal PrecoInicial { get; set; } = 5.0M;

        // Valor cobrado por hora de estacionamento
        public decimal PrecoPorHora { get; set; } = 2.0M;
    }
}

