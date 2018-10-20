using CashFlux.Web.Models.User;
using MediatR;

namespace CashFlux.Web.Requests
{
	public class UserDeleteRequest : IRequest<UserDeleteResult>
	{
		public string Id { get; set; }
	}
}