using System.Net.Http;
using System.Threading.Tasks;
using CashFlux.Web.Features.Profile;
using Xunit;

namespace CashFlux.Test.Features.Profile
{
	public class ProfilePostRequestTest : CashFluxWebServerTestBase
	{
		public ProfilePostRequestTest(CashFluxWebApplicationFactory applicationFactory)
			: base(applicationFactory) { }

		[Fact]
		public async Task ShouldCreateNewProfile()
		{
			var results = await SeedDatabaseWithTestDataAsync();
			
			var response = await SendRequestAsync<ProfileGetRequestModel>(
				Client.PostAsJsonAsync($"api/profile", new ProfilePostRequestModel
				{
					Name = "Another Test Profile",
					UserFk = results.UserId
				}));

			Assert.NotNull(response.Id);
			Assert.NotNull(response.Name);
			Assert.NotNull(response.TimeCreated);
			
			Assert.Empty(response.Fluxes);
		}
	}
}