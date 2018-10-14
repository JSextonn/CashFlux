using CashFlux.Web.Models.Auth;
using MediatR;

namespace CashFlux.Web.Requests
{
	public class LoginRequest : IRequest<string>
	{
		public LoginRequestModel Model { get; set; }
	}
}