using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Web.Models.Profile;
using CashFlux.Web.Requests;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CashFlux.Web.Controllers
{
	public class ProfileController : CashFluxControllerBase
	{
		public ProfileController(IMediator mediator) : base(mediator) { }

		[HttpGet("{id}")]
		public async Task<IActionResult> Get(string id)
		{
			return await HandleRequestAsync(new ProfileGetRequest {Id = id});
		}

		[HttpGet("byuserid/{id}")]
		public async Task<IActionResult> GetByUserId(string id)
		{
			return await HandleRequestAsync(new ProfileGetByUserIdRequest {Id = id});
		}
		
		[HttpPost]
		public async Task<IActionResult> Post([FromBody] ProfilePostRequestModel model)
		{
			return await HandleRequestAsync(new ProfileCreateRequest {Model = model});
		}
	}
}