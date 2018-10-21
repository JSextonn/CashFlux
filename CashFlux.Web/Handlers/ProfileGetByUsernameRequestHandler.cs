using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Web.Models.Profile;
using CashFlux.Web.Requests;

namespace CashFlux.Web.Handlers
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