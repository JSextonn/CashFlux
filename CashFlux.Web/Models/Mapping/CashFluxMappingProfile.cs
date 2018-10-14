using AutoMapper;
using CashFlux.Data.Models;
using CashFlux.Web.Models.User;

namespace CashFlux.Web.Models.Mapping
{
	public class CashFluxMappingProfile : Profile
	{
		public CashFluxMappingProfile()
		{
			// User models
			CreateMap<CashFluxUser, UserGetRequestModel>();
			CreateMap<UserPostRequestModel, CashFluxUser>();
		}
	}
}