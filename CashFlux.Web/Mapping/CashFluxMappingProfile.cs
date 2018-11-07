using AutoMapper;
using CashFlux.Data.Models;
using CashFlux.Web.Features.Flux;
using CashFlux.Web.Features.Profile;
using CashFlux.Web.Features.Source;
using CashFlux.Web.Features.User;
using CashFlux.Web.Features.UserSource;

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

			// Source mapping models
			CreateMap<UserSources, UserSourceGetRequestModel>();
			CreateMap<UserSourcePostRequestModel, UserSources>();

			CreateMap<UserSources, SourceGetRequestModel>()
				.ForMember(source => source.Id, conf => conf.MapFrom(userSource => userSource.Source.Id))
				.ForMember(source => source.Name, conf => conf.MapFrom(userSource => userSource.Source.Name))
				.ForMember(source => source.Category, conf => conf.MapFrom(userSource => userSource.Source.Category))
				.ForMember(source => source.TimeCreated,
					conf => conf.MapFrom(userSource => userSource.Source.TimeCreated));
		}
	}
}