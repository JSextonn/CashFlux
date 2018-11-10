using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Data.Models;
using CashFlux.Web.Features.Shared;

namespace CashFlux.Web.Features.UserSource
{
	public class UserSourcePostRequestHandler 
		: CashFluxRequestHandler<UserSourcePostRequest, UserSourceGetRequestModel>
	{
		public UserSourcePostRequestHandler(CashFluxDbContext context, IMapper mapper) :
			base(context, mapper) { }
		
		public override async Task<UserSourceGetRequestModel> Handle(UserSourcePostRequest request, 
			CancellationToken cancellationToken)
		{
			var userSources = Mapper.Map<UserSources>(request.Model);
			await Context.UserSources.AddAsync(userSources, cancellationToken);
			await Context.SaveChangesAsync(cancellationToken);
			await Context.Entry(userSources).Reference(uSource => uSource.Source).LoadAsync(cancellationToken);
			return Mapper.Map<UserSourceGetRequestModel>(userSources);
		}
	}
}