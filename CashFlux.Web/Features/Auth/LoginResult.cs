namespace CashFlux.Web.Features.Auth
{
	public class LoginResult
	{
		public bool Success => !string.IsNullOrEmpty(Token);
		public string Token { get; set; }
		public string UserId { get; set; }
	}
}