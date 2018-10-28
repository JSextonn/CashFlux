using System.Net.Http;
using System.Threading.Tasks;
using CashFlux.Web.Errors.Models;
using Newtonsoft.Json;
using Xunit;

namespace CashFlux.Test.Features.User
{
	public class UserGetRequestTests : UserWebServerTestBase
	{
		public UserGetRequestTests(CashFluxWebApplicationFactory applicationFactory) 
			: base(applicationFactory) { }
		
		[Fact]
		public async Task ShouldRetrieveUserFromDatabase()
		{
			// Retrieve the same user that was just created
			var retrievedUser = await GetEntityAsync(CreatedUser.Id);

			Assert.Equal(CreatedUser.Id, retrievedUser.Id);
			Assert.Equal(CreatedUser.Username, retrievedUser.Username);
			Assert.Equal(CreatedUser.Email, retrievedUser.Email);
			Assert.Equal(CreatedUser.FirstName, retrievedUser.FirstName);
			Assert.Equal(CreatedUser.LastName, retrievedUser.LastName);
			
			Assert.NotNull(retrievedUser.TimeCreated);

			Assert.Empty(retrievedUser.Sources);
			Assert.Empty(retrievedUser.Profiles);
		}

		[Theory]
		[InlineData("This id does not exist")]
		[InlineData("Another id that does not exist 123")]
		public async Task ShouldReceiveErrorResponseWhenTryingToGetNonExistentUsers(string id)
		{
			var response = await Client.GetAsync($"{EndpointName}/{id}");

			var errorResponse = JsonConvert.DeserializeObject<ErrorResponse>(
				await response.Content.ReadAsStringAsync());
			Assert.Equal($"An CashFluxUser with ID {id} was not found.", errorResponse.Message);

			Assert.Throws<HttpRequestException>(() => response.EnsureSuccessStatusCode());
		}
	}
}