using System.Threading.Tasks;
using CashFlux.Web.Features.Source;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CashFlux.Web.Controllers
{
	public class SourceController : CashFluxControllerBase
	{
		public SourceController(IMediator mediator) : base(mediator) { }
	
		[HttpGet("{id}")]
		public async Task<IActionResult> Get(string id)
		{
			return await HandleRequestAsync(new SourceGetRequest {Id = id});
		}

		[HttpPost]
		public async Task<IActionResult> Post([FromBody] SourcePostRequestModel model)
		{
			return await HandleRequestAsync(new SourceCreateRequest {Model = model});
		}
	}
}