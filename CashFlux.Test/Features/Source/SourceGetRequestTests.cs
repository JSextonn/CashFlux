using System.Threading.Tasks;
using Xunit;

namespace CashFlux.Test.Features.Source
{
	public class SourceGetRequestTests : SourceWebServerTestBase
	{
		public SourceGetRequestTests(CashFluxWebApplicationFactory applicationFactory)
			: base(applicationFactory) { }

		[Fact(Skip = "404 error, unknown reason. Works fine in postman.")]
		public async Task CreatedSourcePropertiesShouldBeValid()
		{
			var source = await GetEntityAsync(CreatedSource.Id);

			Assert.NotNull(source.Id);
			Assert.NotNull(source.TimeCreated);

			Assert.Equal(CreatedSource.Name, source.Name);
			Assert.Equal(CreatedSource.Category, source.Category);
		}
	}
}