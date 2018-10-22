using MediatR;

namespace CashFlux.Web.Features.User
{
	public class UserPostRequest : IRequest<UserGetRequestModel>
	{
		public UserPostRequestModel Model { get; set; }
	}
}