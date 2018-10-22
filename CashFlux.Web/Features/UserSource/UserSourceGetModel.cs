using System.Collections.Generic;
using CashFlux.Web.Features.Source;

namespace CashFlux.Web.Features.UserSource
{
	public class UserSourceGetModel
	{
		public IEnumerable<SourceGetRequestModel> Sources { get; set; }
	}
}