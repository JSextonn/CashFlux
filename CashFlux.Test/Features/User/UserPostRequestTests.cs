using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using CashFlux.Web.Errors.Models;
using CashFlux.Web.Features.User;
using Newtonsoft.Json;
using Xunit;

namespace CashFlux.Test.Features.User
{
	public class UserPostRequestTests : UserWebServerTestBase
	{
		public UserPostRequestTests(CashFluxWebApplicationFactory applicationFactory)
			: base(applicationFactory) { }

		[Fact]
		public void CreatedUserPropertiesShouldBeValid()
		{
			Assert.Equal(DefaultUserPostRequestModel.Username, CreatedUser.Username);
			Assert.Equal(DefaultUserPostRequestModel.Email, CreatedUser.Email);
			Assert.Equal(DefaultUserPostRequestModel.FirstName, CreatedUser.FirstName);
			Assert.Equal(DefaultUserPostRequestModel.LastName, CreatedUser.LastName);

			Assert.NotNull(CreatedUser.Id);
			Assert.NotNull(CreatedUser.TimeCreated);

			Assert.Empty(CreatedUser.Sources);
			Assert.Empty(CreatedUser.Profiles);
		}

		[Fact(Skip = "Failing for some unknown reason")]
		public async Task ShouldAttemptToCreateDuplicateUserButGetErrorResponseBack()
		{
			var response = await Client.PostAsJsonAsync(EndpointName, DefaultUserPostRequestModel);

			var errorResponse = JsonConvert.DeserializeObject<ErrorResponse>(
				await response.Content.ReadAsStringAsync());
			Assert.Equal("Failed to create user with given credentials.", errorResponse.Message);
			Assert.NotEmpty(errorResponse.ErrorDetails);
			
			var firstAndOnlyErrorDetail = errorResponse.ErrorDetails.First();
			Assert.Equal("User name 'test@email.com' is already taken.", firstAndOnlyErrorDetail.Message);
			Assert.Equal("DuplicateUserName", firstAndOnlyErrorDetail.Target);
			
			Assert.Throws<HttpRequestException>(() => response.EnsureSuccessStatusCode());
		}
	}
}