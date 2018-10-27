using System.Threading.Tasks;
using CashFlux.Web.Features.Source;
using Xunit;

namespace CashFlux.Test.Features.Source
{
	public class SourceWebServerTestBase
		: CashFluxWebServerTestBase<SourceGetRequestModel, SourcePostRequestModel, SourceDeleteResult>
	{
		public SourceWebServerTestBase(CashFluxWebApplicationFactory applicationFactory)
			: base(applicationFactory, "api/source") { }

		public SourceGetRequestModel CreatedSource { get; private set; }

		public override async Task InitializeAsync()
		{
			CreatedSource = await CreateEntityAsync(TestDefaults.SourcePostModel);
		}

		public override Task DisposeAsync() => Task.CompletedTask;
	}
}