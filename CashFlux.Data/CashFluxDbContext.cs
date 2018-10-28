using CashFlux.Data.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CashFlux.Data
{
	public class CashFluxDbContext : IdentityDbContext<CashFluxUser>
	{
		public CashFluxDbContext(DbContextOptions options) : base(options) { }

		public DbSet<FluxProfile> Profiles { get; set; }
		public DbSet<Flux> Fluxes { get; set; }
		public DbSet<FluxSource> Sources { get; set; }
		public DbSet<UserSources> UserSources { get; set; }

		protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);
			// Allows composite key to be primary key for user and source junction table.
			builder.Entity<UserSources>().HasKey(table => new
			{
				table.UserId, table.SourceId
			});
		}
	}
}