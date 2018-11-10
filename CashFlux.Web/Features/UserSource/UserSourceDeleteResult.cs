using CashFlux.Web.Features.Source;

namespace CashFlux.Web.Features.UserSource
{
	public class UserSourceDeleteResult
	{
		public string UserDeleteFrom { get; set; }
		public SourceGetRequestModel SourceDeletedFromUser { get; set; }
	}
}