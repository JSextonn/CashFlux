using System;
using System.Net.Http;
using System.Threading.Tasks;
using CashFlux.Web.Features.Profile;
using CashFlux.Web.Features.User;
using Newtonsoft.Json;
using Xunit;

namespace CashFlux.Test.Features
{
	public abstract class CashFluxWebServerTestBase : IClassFixture<CashFluxWebApplicationFactory>, IDisposable
	{
		public CashFluxWebServerTestBase(CashFluxWebApplicationFactory applicationFactory)
		{
			Client = applicationFactory.CreateClient();
		}

		protected HttpClient Client { get; }

		protected static async Task<T> SendRequestAsync<T>(Task<HttpResponseMessage> request)
		{
			var response = await request;
			response.EnsureSuccessStatusCode();
			return JsonConvert.DeserializeObject<T>(await response.Content.ReadAsStringAsync());
		}

		protected async Task<TestDataSeedResults> SeedDatabaseWithTestDataAsync()
		{
			var newUser = await SendRequestAsync<UserGetRequestModel>(
				Client.PostAsJsonAsync("api/user", DefaultPostModels.GetDefaultUserPostRequestModel()));

			var newProfile = await SendRequestAsync<ProfileGetRequestModel>(
				Client.PostAsJsonAsync("api/profile", new ProfilePostRequestModel
				{
					Name = "Test Profile",
					UserFk = newUser.Id
				}));

			return new TestDataSeedResults
			{
				UserId = newUser.Id,
				ProfileId = newProfile.Id
			};
		}

		public void Dispose()
		{
			Client.Dispose();
		}
	}
}