using System;
using CashFlux.Web.Features.Source;

namespace CashFlux.Web.Features.Flux
{
	public class FluxGetRequestModel
	{
		public string Id { get; set; }
		public decimal Amount { get; set; }
		public SourceGetRequestModel Source { get; set; }
		public DateTime TimeCreated { get; set; }
	}
}