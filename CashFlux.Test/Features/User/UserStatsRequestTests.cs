using System.Net.Http;
using System.Threading.Tasks;
using CashFlux.Web.Features.User;
using Xunit;

namespace CashFlux.Test.Features.User
{
	public class UserStatsRequestTests : CashFluxWebServerTestBase
	{
		public UserStatsRequestTests(CashFluxWebApplicationFactory applicationFactory) 
			: base(applicationFactory) { }

		[Fact]
		public async Task ShouldReturnCorrectUserStats()
		{
			await SendRequestAsync<UserGetRequestModel>(
				Client.PostAsJsonAsync("api/user", DefaultPostModels.GetDefaultUserPostRequestModel()));

			var userStats = await SendRequestAsync<UserStats>(
				Client.GetAsync("api/user/stats"));

			const int expectedUserCount = 1;
			Assert.Equal(expectedUserCount, userStats.UserCount);
		}
	}
}