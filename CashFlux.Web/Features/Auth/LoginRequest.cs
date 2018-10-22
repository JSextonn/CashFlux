using MediatR;

namespace CashFlux.Web.Features.Auth
{
	public class LoginRequest : IRequest<LoginResult>
	{
		public LoginRequestModel Model { get; set; }
	}
}