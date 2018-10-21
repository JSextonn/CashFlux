using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Data.Models;
using CashFlux.Web.Exceptions;
using CashFlux.Web.Models.Profile;
using CashFlux.Web.Requests;

namespace CashFlux.Web.Handlers
{
	public class ProfileGetRequestHandler : CashFluxProfileRequestHandler<ProfileGetRequest, ProfileGetRequestModel>
	{
		public ProfileGetRequestHandler(CashFluxDbContext context, IMapper mapper) : base(context, mapper) { }

		public override async Task<ProfileGetRequestModel> Handle(ProfileGetRequest request,
			CancellationToken cancellationToken)
		{
			var profile = await GetProfileByIdAsync(request.Id, cancellationToken);

			if (profile == null)
			{
				throw new EntityNotFoundException(typeof(FluxProfile), request.Id);
			}

			return Mapper.Map<ProfileGetRequestModel>(profile);
		}
	}
}