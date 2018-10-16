using System.Threading.Tasks;
using CashFlux.Web.Models.User;
using CashFlux.Web.Requests;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CashFlux.Web.Controllers
{
	public class UsersController : CashFluxControllerBase
	{
		public UsersController(IMediator mediator) : base(mediator) { }

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
			return await HandleRequestAsync(new UserCreateRequest
			{
				Model = model
			});
		}
	}
}