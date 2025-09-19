using System.ComponentModel.DataAnnotations;

namespace EstacionamentoAPI.Models
{
    public class VeiculoDTO
    {
        [Required(ErrorMessage = "A placa é obrigatória.")]
        [StringLength(8, MinimumLength = 7, ErrorMessage = "A placa deve ter entre 7 e 8 caracteres.")]
        public string Placa { get; set; }
    }
}
