using MediatR;

namespace CashFlux.Web.Features.UserSource
{
	public class UserSourceDeleteMultipleFromOneUserRequest
		: IRequest<UserSourceDeleteMultipleFromOneUserRequestResult>
	{
		public UserSourceDeleteMultipleFromOneUserRequestModel Model { get; set; }
	}
}