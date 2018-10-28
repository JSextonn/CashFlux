using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Data.Models;
using CashFlux.Web.Features.Shared;

namespace CashFlux.Web.Features.Profile
{
	public class ProfileGetMultipleByUsernameRequestHandler
		: CashFluxGetMultipleRequestHandler<FluxProfile,
			ProfileGetMultipleByUsernameRequest,
			ProfileGetMultipleByUsernameRequestModel,
			ProfileGetRequestModel>
	{
		public ProfileGetMultipleByUsernameRequestHandler(CashFluxDbContext context, IMapper mapper)
			: base(context, mapper) { }

		public override async Task<List<ProfileGetRequestModel>> Handle(
			ProfileGetMultipleByUsernameRequest request,
			CancellationToken cancellationToken)
		{
			return await GetEntitiesAsync(profile => profile.User.UserName == request.Model.Username,
				cancellationToken,
				profile => profile.Fluxes);
		}
	}
}