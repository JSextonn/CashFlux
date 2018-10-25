using System.Net.Http;
using System.Threading.Tasks;
using CashFlux.Web.Features.User;
using Xunit;

namespace CashFlux.Test.Features.User
{
	public class UserGetRequestTests : CashFluxWebServerTestBase
	{
		public UserGetRequestTests(CashFluxWebApplicationFactory applicationFactory)
			: base(applicationFactory) { }

		[Fact]
		public async Task ShouldCorrectlyGetUserById()
		{
			var postModel = DefaultPostModels.GetDefaultUserPostRequestModel();
			
			// Create new user
			var newUser = await SendRequestAsync<UserGetRequestModel>(
				Client.PostAsJsonAsync("api/user", postModel));

			// Get newly created user
			var user = await SendRequestAsync<UserGetRequestModel>(
				Client.GetAsync($"api/user/{newUser.Id}"));

			Assert.Equal(postModel.Email, user.Email);
			Assert.Equal(postModel.Username, user.Username);
		}

		[Theory]
		[InlineData("")]
		[InlineData(null)]
		[InlineData("123abc")]
		[InlineData("This id wont exist")]
		public async Task ShouldThrowHttpRequestExceptionWhenUserDoesNotExist(string id)
		{
			var response = await Client.GetAsync($"api/user/{id}");

			// Verify error message
			var message = await response.Content.ReadAsStringAsync();
			var expected = $"\"An CashFluxUser with ID {id} was not found.\"";
			Assert.Equal(expected, message);

			// Should be a bad request
			Assert.Throws<HttpRequestException>(() => response.EnsureSuccessStatusCode());
		}
	}
}