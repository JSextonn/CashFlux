using System.Net.Http;
using System.Threading.Tasks;
using CashFlux.Web.Errors.Models;
using Newtonsoft.Json;
using Xunit;

namespace CashFlux.Test.Features.User
{
	public class UserDeleteRequestTests : UserWebServerTestBase
	{
		public UserDeleteRequestTests(CashFluxWebApplicationFactory applicationFactory)
			: base(applicationFactory) { }

		[Fact]
		public async Task ShouldDeleteUserFromDatabase()
		{
			var result = await DeleteEntityAsync(CreatedUser.Id);

			Assert.Equal(CreatedUser.Id, result.DeletedUser);
			Assert.Empty(result.DeletedProfiles);
			Assert.Empty(result.DeletedFluxes);
		}

		[Theory]
		[InlineData("This id does not exist")]
		public async Task ShouldAttemptToDeleteUsersThatDoNotExistButGetCorrectErrorMessage(string id)
		{
			var response = await Client.DeleteAsync($"{EndpointName}/{id}");

			var errorResponse = JsonConvert.DeserializeObject<ErrorResponse>(
				await response.Content.ReadAsStringAsync());
			Assert.Equal($"An CashFluxUser with ID {id} was not found.", errorResponse.Message);

			Assert.Throws<HttpRequestException>(() => response.EnsureSuccessStatusCode());
		}
	}
}