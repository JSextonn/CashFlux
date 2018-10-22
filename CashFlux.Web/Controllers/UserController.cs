using System.Threading.Tasks;
using CashFlux.Web.Features.User;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CashFlux.Web.Controllers
{
	public class UserController : CashFluxControllerBase
	{
		public UserController(IMediator mediator) : base(mediator) { }

		[HttpGet("stats")]
		public async Task<IActionResult> Get()
		{
			return await HandleRequestAsync(new UserStatsRequest());
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> Get(string id)
		{
			return await HandleRequestAsync(new UserGetRequest {Id = id});
		}

		[HttpPost]
		public async Task<IActionResult> Post([FromBody] UserPostRequestModel model)
		{
			return await HandleRequestAsync(new UserCreateRequest {Model = model});
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> Delete(string id)
		{
			return await HandleRequestAsync(new UserDeleteRequest {Id = id});
		}
	}
}