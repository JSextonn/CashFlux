using System.Threading.Tasks;
using CashFlux.Web.Features.UserSource;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CashFlux.Web.Controllers
{
	public class UserSourceController : CashFluxControllerBase
	{
		public UserSourceController(IMediator mediator) : base(mediator) { }

		[HttpGet("{userId}")]
		public async Task<IActionResult> Get(string userId)
		{
			return await HandleRequestAsync(new UserSourceGetRequest {Id = userId});
		}

		public async Task<IActionResult> Post([FromBody] UserSourcePostModel model)
		{
			return await HandleRequestAsync(new UserSourcePostRequest {Model = model});
		}

		public async Task<IActionResult> Delete([FromBody] UserSourceDeleteModel model)
		{
			return await HandleRequestAsync(new UserSourceDeleteRequest {Model = model});
		}
	}
}