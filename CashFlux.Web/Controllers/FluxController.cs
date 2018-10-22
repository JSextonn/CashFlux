using System.Threading.Tasks;
using CashFlux.Web.Features.Flux;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CashFlux.Web.Controllers
{
	public class FluxController : CashFluxControllerBase
	{
		public FluxController(IMediator mediator) : base(mediator) { }

		[HttpGet("{id}")]
		public async Task<IActionResult> Get(string id)
		{
			return await HandleRequestAsync(new FluxGetRequest {Id = id});
		}
	}
}