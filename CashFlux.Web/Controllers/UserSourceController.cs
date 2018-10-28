using System.Threading.Tasks;
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

		[HttpDelete]
		public async Task<IActionResult> Delete([FromBody] UserSourceDeleteModel model)
		{
			return await HandleRequestAsync(new UserSourceDeleteRequest {Model = model});
		}
	}
}