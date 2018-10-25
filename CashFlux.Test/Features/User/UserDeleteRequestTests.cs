using System.Net.Http;
using System.Threading.Tasks;
using CashFlux.Web.Features.User;
using Xunit;

namespace CashFlux.Test.Features.User
{
	public class UserDeleteRequestTests : CashFluxWebServerTestBase
	{
		public UserDeleteRequestTests(CashFluxWebApplicationFactory applicationFactory)
			: base(applicationFactory) { }

		[Fact]
		public async Task ShouldSuccessfullyDeleteUser()
		{
			var newUser = await SendRequestAsync<UserGetRequestModel>(
				Client.PostAsJsonAsync("api/user", DefaultPostModels.GetDefaultUserPostRequestModel()));
			
			var deleteResult = await SendRequestAsync<UserDeleteResult>(
				Client.DeleteAsync($"api/user/{newUser.Id}"));

			Assert.Equal(newUser.Id, deleteResult.UserId);
			Assert.Empty(deleteResult.DeletedFluxes);
			Assert.Empty(deleteResult.DeletedProfiles);
		}
	}
}