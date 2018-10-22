using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Data.Models;
using CashFlux.Web.Features.Shared;

namespace CashFlux.Web.Features.Profile
{
	public class ProfilePostRequestHandler : CashFluxRequestHandler<ProfilePostRequest, ProfileGetRequestModel>
	{
		public ProfilePostRequestHandler(CashFluxDbContext context, IMapper mapper) : base(context, mapper) { }

		public override async Task<ProfileGetRequestModel> Handle(ProfilePostRequest request,
			CancellationToken cancellationToken)
		{
			var newEntity = Mapper.Map<FluxProfile>(request.Model);
			await Context.Profiles.AddAsync(newEntity, cancellationToken);
			await Context.SaveChangesAsync(cancellationToken);
			return Mapper.Map<ProfileGetRequestModel>(newEntity);
		}
	}
}