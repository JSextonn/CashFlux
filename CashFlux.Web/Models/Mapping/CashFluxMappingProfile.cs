using CashFlux.Data.Models;
using CashFlux.Web.Models.Flux;
using CashFlux.Web.Models.Profile;
using CashFlux.Web.Models.Source;
using CashFlux.Web.Models.User;

namespace CashFlux.Web.Models.Mapping
{
	public class CashFluxMappingProfile : AutoMapper.Profile
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
			CreateMap<Data.Models.Flux, FluxGetRequestModel>();
			// TODO: Create map for FluxPostRequest to Flux
			
			// Source mapping models
			CreateMap<FluxSource, SourceGetRequestModel>();
			// TODO: Create map for SourcePostRequest to FluxSource
		}
	}
}