using AutoMapper;
using CashFlux.Data.Models;
using CashFlux.Web.Features.Flux;
using CashFlux.Web.Features.Profile;
using CashFlux.Web.Features.Source;
using CashFlux.Web.Features.User;

namespace CashFlux.Web.Mapping
{
	public class CashFluxMappingProfile : Profile
	{
		public CashFluxMappingProfile()
		{
			// User mapping models
			CreateMap<CashFluxUser, UserGetRequestModel>();
			CreateMap<UserPostRequestModel, CashFluxUser>();

			// Profile mapping models
			CreateMap<FluxProfile, ProfileGetRequestModel>();
			CreateMap<ProfilePostRequestModel, FluxProfile>();

			// Flux mapping models
			CreateMap<Flux, FluxGetRequestModel>();
			CreateMap<FluxPostRequestModel, Flux>();

			// Source mapping models
			CreateMap<FluxSource, SourceGetRequestModel>();
			CreateMap<SourcePostRequestModel, FluxSource>();
		}
	}
}