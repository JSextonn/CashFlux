using System;

namespace CashFlux.Web.Features.Flux
{
	public class FluxPostRequestModel
	{
		public decimal Amount { get; set; }
		public string SourceId { get; set; }
		public string ProfileId { get; set; }
		public DateTime TimeOccurred { get; set; }
	}
}