using CashFlux.Web.Features.Auth;

namespace CashFlux.Web.Errors.Models
{
	public class FailedLoginErrorDetail : ErrorDetail
	{
		public LoginResult Result { get; set; }
	}
}