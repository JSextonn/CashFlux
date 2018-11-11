using System.ComponentModel.DataAnnotations.Schema;

namespace CashFlux.Data
{
	public interface ICompositeCashFluxEntity
	{
		[NotMapped]
		object[] Id { get; }
	}
}