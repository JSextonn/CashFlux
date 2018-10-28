using System.Threading.Tasks;
using CashFlux.Web.Features.Auth;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CashFlux.Web.Controllers
{
	public class AuthController : CashFluxControllerBase
	{
		public AuthController(IMediator mediator) : base(mediator) { }

		[HttpPost]
		public async Task<IActionResult> Login([FromBody] LoginRequestModel model)
		{
			return await HandleRequestAsync(new LoginRequest {Model = model});
		}
	}
}