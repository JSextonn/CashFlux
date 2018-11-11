using System.Threading.Tasks;
using CashFlux.Web.Features.Associates;
using CashFlux.Web.Features.UserSource;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CashFlux.Web.Controllers
{
	public class UserSourceController : CashFluxControllerBase
	{
		public UserSourceController(IMediator mediator) : base(mediator) { }

		[HttpGet("byuserid/{id}")]
		public async Task<IActionResult> GetByUserId(string id)
		{
			return await HandleRequestAsync(new UserSourceGetMultipleByUserIdRequest
			{
				Model = new UserSourceGetMultipleByUserIdRequestModel {UserId = id}
			});
		}
		
		[HttpPost]
		public async Task<IActionResult> Post([FromBody] UserSourcePostRequestModel model)
		{
			return await HandleRequestAsync(new UserSourcePostRequest {Model = model});
		}
		
		[HttpPost("withsource")]
		public async Task<IActionResult> Post([FromBody] UserSourceAndSourcePostRequestModel model)
		{
			return await HandleRequestAsync(new UserSourceAndSourcePostRequest {Model = model});
		}

		[HttpDelete("single")]
		public async Task<IActionResult> Delete([FromBody] UserSourceDeleteModel model)
		{
			return await HandleRequestAsync(new UserSourceDeleteRequest {Model = model});
		}

		[HttpDelete("multiple")]
		public async Task<IActionResult> DeleteMultipleFromOneUser(
			[FromBody] UserSourceDeleteMultipleFromOneUserRequestModel model)
		{
			return await HandleRequestAsync(new UserSourceDeleteMultipleFromOneUserRequest
			{
				Model = model
			});
		}
	}
}