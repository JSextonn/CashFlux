using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Data.Models;
using CashFlux.Web.Features.Shared;

namespace CashFlux.Web.Features.Profile
{
	public class ProfileGetMultipleByUserIdRequestHandler
		: CashFluxGetMultipleRequestHandler<FluxProfile,
			ProfileGetMultipleByUserIdRequest,
			ProfileGetMultipleByUserIdRequestModel,
			ProfileGetRequestModel>
	{
		public ProfileGetMultipleByUserIdRequestHandler(CashFluxDbContext context, IMapper mapper)
			: base(context, mapper) { }

		public override async Task<List<ProfileGetRequestModel>> Handle(
			ProfileGetMultipleByUserIdRequest request,
			CancellationToken cancellationToken)
		{
			return await GetEntitiesAsync(profile => profile.UserFk == request.Model.UserId,
				cancellationToken,
				profile => profile.Fluxes);
		}
	}
}