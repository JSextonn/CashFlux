using System.Collections.Generic;

namespace CashFlux.Web.Features.Profile
{
	public class ProfileDeleteResult
	{
		public string ProfileId { get; set; }
		public IEnumerable<string> DeletedFluxIds { get; set; }
	}
}