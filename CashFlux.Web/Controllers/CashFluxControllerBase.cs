using System;
using System.Threading.Tasks;
using CashFlux.Web.Errors;
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
				return BadRequest(ErrorResponse.DefaultErrorResponse());
			}

			try
			{
				var response = await Mediator.Send(request);
				return Ok(response);
			}
			catch (Exception ex) when (
				ex is FailedAuthenticationException || 
				ex is UserCreationException)
			{
				return BadRequest(((IErrorResponseConvertible) ex).ToErrorResponse());
			}
			catch (EntityNotFoundException ex)
			{
				return NotFound(ex.ToErrorResponse());
			}
		}
	}
}