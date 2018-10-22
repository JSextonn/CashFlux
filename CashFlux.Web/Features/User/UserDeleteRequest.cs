using MediatR;

namespace CashFlux.Web.Features.User
{
	public class UserDeleteRequest : IRequest<UserDeleteResult>
	{
		public string Id { get; set; }
	}
}