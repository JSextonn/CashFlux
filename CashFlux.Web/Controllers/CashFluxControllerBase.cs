using System.Linq;
using System.Threading.Tasks;
using CashFlux.Web.Errors.Exceptions;
using CashFlux.Web.Errors.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CashFlux.Web.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	[Produces("application/json")]
	public abstract class CashFluxControllerBase : ControllerBase
	{
		protected CashFluxControllerBase(IMediator mediator)
		{
			Mediator = mediator;
		}

		public IMediator Mediator { get; }

		protected async Task<IActionResult> HandleRequestAsync<TReturn>(IRequest<TReturn> request)
		{
			if (request == null)
			{
				var error = new ErrorResponse
				{
					Message = "A bad request was received.",
					ErrorDetails = new[]
					{
						new ErrorDetail
						{
							Message = "The body of the request contained no usable content."
						}
					}
				};
				return BadRequest(error);
			}

			try
			{
				var response = await Mediator.Send(request);
				return Ok(response);
			}
			catch (UserCreationException ex)
			{
				var error = new ErrorResponse
				{
					Message = ex.Message,
					ErrorDetails = ex.Errors.Select(e => new ErrorDetail
					{
						Message = e.Description,
						Target = e.Code
					}).ToArray()
				};
				return BadRequest(error);
			}
			catch (FailedLoginException ex)
			{
				return BadRequest(ex.Message);
			}
			catch (EntityNotFoundException ex)
			{
				return NotFound(ex.Message);
			}
		}
	}
}