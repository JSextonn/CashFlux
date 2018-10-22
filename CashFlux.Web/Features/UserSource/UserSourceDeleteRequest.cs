using MediatR;

namespace CashFlux.Web.Features.UserSource
{
	public class UserSourceDeleteRequest : IRequest<UserSourceDeleteResult>
	{
		public UserSourceDeleteModel Model { get; set; }
	}
}