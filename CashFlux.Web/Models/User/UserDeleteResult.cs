using System.Collections.Generic;

namespace CashFlux.Web.Models.User
{
	public class UserDeleteResult
	{
		public string UserId { get; set; }
		public IEnumerable<string> DeletedProfiles { get; set; }
		public IEnumerable<string> DeletedFluxes { get; set; }
	}
}