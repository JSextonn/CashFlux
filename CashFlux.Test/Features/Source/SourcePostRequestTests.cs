using Xunit;

namespace CashFlux.Test.Features.Source
{
	public class SourcePostRequestTests : SourceWebServerTestBase
	{
		public SourcePostRequestTests(CashFluxWebApplicationFactory applicationFactory) 
			: base(applicationFactory) { }
		
		[Fact]
		public void CreatedSourcePropertiesShouldBeValid()
		{
			Assert.NotNull(CreatedSource.Id);
			
			Assert.Equal(TestDefaults.SourcePostModel.Name, CreatedSource.Name);
			Assert.Equal(TestDefaults.SourcePostModel.Category, CreatedSource.Category);
		}
	}
}