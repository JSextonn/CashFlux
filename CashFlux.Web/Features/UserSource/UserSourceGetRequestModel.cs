using CashFlux.Web.Features.Source;

namespace CashFlux.Web.Features.UserSource
{
	public class UserSourceGetRequestModel
	{
		public string UserId { get; set; }
		public SourceGetRequestModel Source { get; set; }
	}
}