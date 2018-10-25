using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using CashFlux.Web;
using CashFlux.Web.Features.User;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc.Testing;
using Newtonsoft.Json;
using Xunit;

namespace CashFlux.Test.Features.User
{
	public class UserPostRequestTests : CashFluxWebServerTestBase
	{
		public UserPostRequestTests(CashFluxWebApplicationFactory applicationFactory) 
			: base(applicationFactory) { }

		[Fact]
		public async Task ShouldCreateNewCashFluxUser()
		{
			var postModel = DefaultPostModels.GetDefaultUserPostRequestModel();
			
			var createdUser = await SendRequestAsync<UserGetRequestModel>(
				Client.PostAsJsonAsync("api/user", postModel));
		
			// Make sure response is correctly formatted 
			Assert.Equal(postModel.Username, createdUser.Username);
			Assert.Equal(postModel.Email, createdUser.Email);
			Assert.Equal(postModel.FirstName, createdUser.FirstName);
			Assert.Equal(postModel.LastName, createdUser.LastName);
			Assert.Equal($"{postModel.FirstName} {postModel.LastName}", createdUser.FullName);
			
			Assert.NotNull(createdUser.Id);
			Assert.NotNull(createdUser.TimeCreated);
			
			Assert.Empty(createdUser.Profiles);
			Assert.Empty(createdUser.Sources);
		}
	}
}