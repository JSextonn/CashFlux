using CashFlux.Data;
using CashFlux.Web;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace CashFlux.Test.Features
{
	public class CashFluxWebApplicationFactory : WebApplicationFactory<Startup>
	{
		protected override void ConfigureWebHost(IWebHostBuilder builder)
		{
			// Override SqlServer and add in memory database for testing purposes.
			builder.ConfigureServices(services => services.AddDbContext<CashFluxDbContext>(options =>
				options.UseInMemoryDatabase("CashFluxTestDatabase")));

			base.ConfigureWebHost(builder);
		}
	}
}