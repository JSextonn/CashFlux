using System.Net.Http;
using System.Threading.Tasks;
using CashFlux.Web.Features.Flux;
using CashFlux.Web.Features.Profile;
using CashFlux.Web.Features.Source;
using CashFlux.Web.Features.User;

namespace CashFlux.Test.Features.Flux
{
	public class FluxWebServerTestBase
		: CashFluxWebServerTestBase<FluxGetRequestModel, FluxPostRequestModel, FluxDeleteResult>
	{
		public FluxWebServerTestBase(CashFluxWebApplicationFactory applicationFactory, string endpointName)
			: base(applicationFactory, endpointName) { }

		public UserGetRequestModel CreatedUser { get; private set; }
		public ProfileGetRequestModel CreatedProfile { get; private set; }
		public SourceGetRequestModel CreatedSource { get; private set; }
		public FluxGetRequestModel CreatedFlux { get; private set; }

		public override async Task InitializeAsync()
		{
			CreatedSource = await SendRequestAsync<SourceGetRequestModel>(
				Client.PostAsJsonAsync("api/source", TestDefaults.SourcePostModel));
			
			CreatedUser = await SendRequestAsync<UserGetRequestModel>(
				Client.PostAsJsonAsync("api/user", TestDefaults.UserPostModel));

			CreatedProfile = await SendRequestAsync<ProfileGetRequestModel>(
				Client.PostAsJsonAsync("api/profile", new ProfilePostRequestModel
				{
					Name = "Test Profile",
					UserId = CreatedUser.Id
				}));

			CreatedFlux = await CreateEntityAsync(new FluxPostRequestModel
			{
				Amount = 50,
				ProfileId = CreatedProfile.Id,
				SourceId = CreatedSource.Id
			});
		}

		public override Task DisposeAsync() => Task.CompletedTask;
	}
}