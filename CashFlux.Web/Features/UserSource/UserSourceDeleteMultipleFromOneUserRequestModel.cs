using System.Collections.Generic;

namespace CashFlux.Web.Features.UserSource
{
	public class UserSourceDeleteMultipleFromOneUserRequestModel
	{
		public string UserId { get; set; }
		public IEnumerable<string> SourceIds { get; set; }
	}
}