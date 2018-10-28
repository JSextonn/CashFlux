using System.Collections.Generic;
using MediatR;

namespace CashFlux.Web.Features.Shared
{
	public class DeleteMultipleRequest<TDeleteResult> : IRequest<TDeleteResult>
	{
		public IEnumerable<string> Ids { get; set; }
	}
}