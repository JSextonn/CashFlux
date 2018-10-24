using System.ComponentModel.DataAnnotations;

namespace CashFlux.Data
{
	public interface ICashFluxEntity
	{
		[Key]
		string Id { get; set; }
	}
}