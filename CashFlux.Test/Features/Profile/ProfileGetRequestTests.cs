using System.Threading.Tasks;
using CashFlux.Web.Features.Profile;
using Xunit;

namespace CashFlux.Test.Features.Profile
{
	public class ProfileGetRequestTests : CashFluxWebServerTestBase
	{
		public ProfileGetRequestTests(CashFluxWebApplicationFactory applicationFactory)
			: base(applicationFactory) { }

		[Fact]
		public async Task ShouldGetProfileById()
		{
			var results = await SeedDatabaseWithTestDataAsync();

			var response = await SendRequestAsync<ProfileGetRequestModel>(
				Client.GetAsync($"api/profile/{results.ProfileId}"));

			Assert.NotNull(response.Id);
			Assert.NotNull(response.Name);
			Assert.NotNull(response.TimeCreated);
			
			Assert.Empty(response.Fluxes);
		}
	}
}