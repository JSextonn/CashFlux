using CashFlux.Web.Models.User;
using MediatR;

namespace CashFlux.Web.Mediator.Requests
{
	public class UserGetRequest : IRequest<UserGetRequestModel>
	{
		public string Id { get; set; }
	}
}