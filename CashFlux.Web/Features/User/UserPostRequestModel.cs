namespace CashFlux.Web.Features.User
{
	public class UserPostRequestModel
	{
		public string Username { get; set; }
		public string Email => Username;
		public string Password { get; set; }
		public string ConfirmPassword { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
	}
}