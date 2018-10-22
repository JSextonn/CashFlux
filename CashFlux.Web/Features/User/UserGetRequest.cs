using MediatR;

namespace CashFlux.Web.Features.User
{
	public class UserGetRequest : IRequest<UserGetRequestModel>
	{
		public string Id { get; set; }
	}
}