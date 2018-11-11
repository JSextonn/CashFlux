using System.Collections.Generic;
using CashFlux.Web.Features.Source;

namespace CashFlux.Web.Features.UserSource
{
	public class UserSourceDeleteMultipleFromOneUserRequestResult
	{
		public string UserId { get; set; }
		public IEnumerable<SourceGetRequestModel> SourcesDeletedFromUser { get; set; }
	}
}