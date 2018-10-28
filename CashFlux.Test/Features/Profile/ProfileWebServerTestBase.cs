using System.Net.Http;
using System.Threading.Tasks;
using CashFlux.Test.Features.User;
using CashFlux.Web.Features.Profile;
using CashFlux.Web.Features.User;

namespace CashFlux.Test.Features.Profile
{
	public class ProfileWebServerTestBase 
		: CashFluxWebServerTestBase<ProfileGetRequestModel, ProfilePostRequestModel, ProfileDeleteResult>
	{
		public ProfileWebServerTestBase(CashFluxWebApplicationFactory applicationFactory) 
			: base(applicationFactory, "api/profile") { }

		public ProfileGetRequestModel CreatedProfile { get; private set; }
		public UserGetRequestModel CreatedUser { get; private set; }

		public override async Task InitializeAsync()
		{
			CreatedUser = await SendRequestAsync<UserGetRequestModel>(
				Client.PostAsJsonAsync("api/user", TestDefaults.UserPostModel));

			CreatedProfile = await CreateEntityAsync(new ProfilePostRequestModel
			{
				Name = "Test Profile",
				UserId = CreatedUser.Id
			});
		}

		public override Task DisposeAsync() => Task.CompletedTask;
	}
}