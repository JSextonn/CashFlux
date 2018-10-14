using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using MediatR;

namespace CashFlux.Web.Handlers
{
	public abstract class CashFluxRequestHandler<TRequest, TResponse> : IRequestHandler<TRequest, TResponse>
		where TRequest : IRequest<TResponse>
	{
		protected CashFluxRequestHandler(CashFluxDbContext context, IMapper mapper)
		{
			Context = context ?? throw new ArgumentNullException(nameof(context));
			Mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
		}

		protected CashFluxDbContext Context { get; }
		protected IMapper Mapper { get; }

		public abstract Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken);
	}
}