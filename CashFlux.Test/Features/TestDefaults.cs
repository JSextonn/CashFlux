using CashFlux.Web.Features.Profile;
using CashFlux.Web.Features.Source;
using CashFlux.Web.Features.User;

namespace CashFlux.Test.Features
{
	public class TestDefaults
	{
		public static UserPostRequestModel UserPostModel =>
			new UserPostRequestModel
			{
				Username = "test@email.com",
				Password = "Password1",
				ConfirmPassword = "Password1",
				FirstName = "First",
				LastName = "Last"
			};

		public static SourcePostRequestModel SourcePostModel =>
			new SourcePostRequestModel
			{
				Name = "Wal-Mart",
				Category = "Food"
			};
	}
}