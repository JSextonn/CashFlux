using System.Collections.Generic;
using MediatR;

namespace CashFlux.Web.Features.Shared
{
	public abstract class GetMultipleRequest<TGetMultipleModel, TGetModel>
		: IRequest<List<TGetModel>>
	{
		public TGetMultipleModel Model { get; set; }
	}
}