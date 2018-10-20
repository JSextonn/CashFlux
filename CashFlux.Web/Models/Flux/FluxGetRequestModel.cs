using CashFlux.Web.Models.Source;

namespace CashFlux.Web.Models.Flux
{
	public class FluxGetRequestModel
	{
		public string Id { get; set; }
		public decimal Amount { get; set; }
		public SourceGetRequestModel Source { get; set; }
	}
}