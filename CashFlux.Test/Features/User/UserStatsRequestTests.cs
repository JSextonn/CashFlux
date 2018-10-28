using System.Threading.Tasks;
using CashFlux.Web.Features.User;
using Xunit;

namespace CashFlux.Test.Features.User
{
	public class UserStatsRequestTests : UserWebServerTestBase
	{
		public UserStatsRequestTests(CashFluxWebApplicationFactory applicationFactory) 
			: base(applicationFactory) { }

		[Fact]
		public async Task ShouldRetrieveStatsOnTheCurrentStateOfTheCashFluxUserBase()
		{
			var responseContent = await SendRequestAsync<UserStats>(
				Client.GetAsync("api/user/stats"));
			
			Assert.Equal(1, responseContent.UserCount);
		}
	}
}