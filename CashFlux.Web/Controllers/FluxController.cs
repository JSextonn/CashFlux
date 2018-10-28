using System.Collections.Generic;
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

		[HttpPost]
		public async Task<IActionResult> Post([FromBody] FluxPostRequestModel model)
		{
			return await HandleRequestAsync(new FluxPostRequest {Model = model});
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> Delete(string id)
		{
			return await HandleRequestAsync(new FluxDeleteRequest{Id = id});
		}
		
		[HttpDelete]
		public async Task<IActionResult> DeleteMultiple([FromBody] IEnumerable<string> ids)
		{
			return await HandleRequestAsync(new FluxDeleteMultipleRequest{Ids = ids});
		}
	}
}