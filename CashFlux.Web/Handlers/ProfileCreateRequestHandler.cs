using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Data.Models;
using CashFlux.Web.Models.Profile;
using CashFlux.Web.Requests;

namespace CashFlux.Web.Handlers
{
	public class ProfileCreateRequestHandler : CashFluxRequestHandler<ProfileCreateRequest, ProfileGetRequestModel>
	{
		public ProfileCreateRequestHandler(CashFluxDbContext context, IMapper mapper) : base(context, mapper) { }

		public override async Task<ProfileGetRequestModel> Handle(ProfileCreateRequest request,
			CancellationToken cancellationToken)
		{
			var newEntity = Mapper.Map<FluxProfile>(request.Model);
			await Context.Profiles.AddAsync(newEntity, cancellationToken);
			await Context.SaveChangesAsync(cancellationToken);
			return Mapper.Map<ProfileGetRequestModel>(newEntity);
		}
	}
}