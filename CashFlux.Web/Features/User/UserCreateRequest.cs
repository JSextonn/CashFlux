using MediatR;

namespace CashFlux.Web.Features.User
{
	public class UserCreateRequest : IRequest<UserGetRequestModel>
	{
		public UserPostRequestModel Model { get; set; }
	}
}