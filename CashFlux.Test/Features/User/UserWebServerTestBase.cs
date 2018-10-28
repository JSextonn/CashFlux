using System.Threading.Tasks;
using CashFlux.Web.Features.User;

namespace CashFlux.Test.Features.User
{
	public abstract class UserWebServerTestBase 
		: CashFluxWebServerTestBase<UserGetRequestModel, UserPostRequestModel, UserDeleteResult>
	{
		public UserWebServerTestBase(CashFluxWebApplicationFactory applicationFactory)
			: base(applicationFactory, "api/user")
		{
			DefaultUserPostRequestModel = TestDefaults.UserPostModel;
		}

		protected UserGetRequestModel CreatedUser { get; private set; }
		protected UserPostRequestModel DefaultUserPostRequestModel { get; }

		public override async Task InitializeAsync()
		{
			CreatedUser = await CreateEntityAsync(DefaultUserPostRequestModel);
		}

		public override Task DisposeAsync() => Task.CompletedTask;
	}
}