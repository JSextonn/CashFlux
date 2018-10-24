using System;
using CashFlux.Data;
using FluentValidation;

namespace CashFlux.Web.Features.Shared
{
	public abstract class CashFluxAbstractValidator<TModel> : AbstractValidator<TModel>
	{
		protected CashFluxAbstractValidator(CashFluxDbContext context)
		{
			Context = context ?? throw new ArgumentNullException(nameof(context));
		}

		public CashFluxDbContext Context { get; }
	}
}