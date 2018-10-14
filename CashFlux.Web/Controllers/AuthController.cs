using System.Threading.Tasks;
using CashFlux.Web.Models.Auth;
using CashFlux.Web.Requests;
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