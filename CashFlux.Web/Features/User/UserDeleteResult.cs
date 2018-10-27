using System.Collections.Generic;

namespace CashFlux.Web.Features.User
{
	public class UserDeleteResult
	{
		public string DeletedUser { get; set; }
		public IEnumerable<string> DeletedProfiles { get; set; }
		public IEnumerable<string> DeletedFluxes { get; set; }
	}
}