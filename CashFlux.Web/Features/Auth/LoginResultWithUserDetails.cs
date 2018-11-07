using CashFlux.Web.Features.User;

namespace CashFlux.Web.Features.Auth
{
	public class LoginResultWithUserDetails : LoginResult
	{
		public UserGetRequestModel UserDetails { get; set; }
	}
}