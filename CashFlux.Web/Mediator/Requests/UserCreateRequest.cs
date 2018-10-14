using CashFlux.Web.Models.User;
using MediatR;

namespace CashFlux.Web.Mediator.Requests
{
	public class UserCreateRequest : IRequest<UserGetRequestModel>
	{
		public UserPostRequestModel Model { get; set; }
	}
}