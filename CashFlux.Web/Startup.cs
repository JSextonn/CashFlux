using System.Reflection;
using System.Text;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Data.Models;
using CashFlux.Web.Mapping;
using CashFlux.Web.Validation;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace CashFlux.Web
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddMvc(options => options.Filters.Add(typeof(CashFluxValidatorActionFilter)))
				.AddFluentValidation(fvc => fvc.RegisterValidatorsFromAssemblyContaining<Startup>())
				.SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

			services.AddMediatR(typeof(Startup).GetTypeInfo().Assembly);

			// Add CashFlux auto mapper profile
			services.AddSingleton(new MapperConfiguration(conf => { conf.AddProfile(new CashFluxMappingProfile()); })
				.CreateMapper());

			services.AddSingleton(Configuration);

			// CashFlux Database context
			services.AddDbContext<CashFluxDbContext>(options =>
				options.UseSqlServer(Configuration.GetConnectionString("CashFluxDatabase")));

			// Identity functionality and services
			services.AddIdentity<CashFluxUser, IdentityRole>()
				.AddEntityFrameworkStores<CashFluxDbContext>()
				.AddDefaultTokenProviders();

			// Bearer authentication functionality and policy
			services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
				.AddJwtBearer(options =>
				{
					options.TokenValidationParameters = new TokenValidationParameters
					{
						ValidateIssuer = true,
						ValidateAudience = true,
						ValidateLifetime = true,
						ValidateIssuerSigningKey = true,
						ValidIssuer = Configuration["Jwt:Issuer"],
						ValidAudience = Configuration["Jwt:Audience"],
						IssuerSigningKey =
							new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:SecretKey"]))
					};
				});

			// Password policy configuration
			services.Configure<IdentityOptions>(options =>
			{
				options.Password.RequireNonAlphanumeric = false;
				options.Password.RequiredLength = 8;
			});

			// In production, the Angular files will be served from this directory
			services.AddSpaStaticFiles(configuration => { configuration.RootPath = "ClientApp/dist"; });
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}
			else
			{
				app.UseExceptionHandler("/Error");
				app.UseHsts();
			}

			app.UseAuthentication();
			app.UseHttpsRedirection();
			app.UseStaticFiles();
			app.UseSpaStaticFiles();

			app.UseMvc(routes =>
			{
				routes.MapRoute(
					name: "default",
					template: "{controller}/{action=Index}/{id?}");
			});

			app.UseSpa(spa =>
			{
				// To learn more about options for serving an Angular SPA from ASP.NET Core,
				// see https://go.microsoft.com/fwlink/?linkid=864501

				spa.Options.SourcePath = "ClientApp";

				if (env.IsDevelopment())
				{
					spa.UseAngularCliServer(npmScript: "start");
				}
			});
		}
	}
}