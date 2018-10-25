using CashFlux.Web.Features.User;

namespace CashFlux.Test.Features
{
	public static class DefaultPostModels
	{
		public static UserPostRequestModel GetDefaultUserPostRequestModel()
		{
			return new UserPostRequestModel
			{
				Username = "test@email.com",
				Password = "Password1",
				ConfirmPassword = "Password1",
				FirstName = "First",
				LastName = "Last"
			};
		}
	}
}