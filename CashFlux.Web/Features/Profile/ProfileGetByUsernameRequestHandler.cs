using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Web.Features.Shared;

namespace CashFlux.Web.Features.Profile
{
	public class ProfileGetByUsernameRequestHandler
		: CashFluxProfileRequestHandler<ProfileGetByUsernameRequest, List<ProfileGetRequestModel>>
	{
		public ProfileGetByUsernameRequestHandler(CashFluxDbContext context, IMapper mapper)
			: base(context, mapper) { }

		public override async Task<List<ProfileGetRequestModel>> Handle(ProfileGetByUsernameRequest request,
			CancellationToken cancellationToken)
		{
			var profiles = await GetProfilesByUsernameAsync(request.Username, cancellationToken);
			return Mapper.Map<List<ProfileGetRequestModel>>(profiles);
		}
	}
}