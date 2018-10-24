using CashFlux.Web.Features.Shared;

namespace CashFlux.Web.Features.UserSource
{
	public class UserSourceDeleteRequest : DeleteRequest<UserSourceDeleteResult>
	{
		public UserSourceDeleteModel Model { get; set; }
	}
}