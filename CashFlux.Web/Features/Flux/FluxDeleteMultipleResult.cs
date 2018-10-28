using System.Collections.Generic;

namespace CashFlux.Web.Features.Flux
{
	public class FluxDeleteMultipleResult
	{
		public IEnumerable<string> DeletedFluxes { get; set; }
	}
}