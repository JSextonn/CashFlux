using System.Threading.Tasks;
using CashFlux.Web.Models.Profile;
using CashFlux.Web.Requests;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CashFlux.Web.Controllers
{
	public class ProfileController : CashFluxControllerBase
	{
		public ProfileController(IMediator mediator) : base(mediator) { }

		[HttpPost]
		public async Task<IActionResult> Post([FromBody] ProfilePostRequestModel model)
		{
			return await HandleRequestAsync(new ProfileCreateRequest {Model = model});
		}
	}
}