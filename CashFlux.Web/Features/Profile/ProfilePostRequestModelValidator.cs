using System.Threading;
using System.Threading.Tasks;
using CashFlux.Data;
using CashFlux.Web.Features.Shared;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace CashFlux.Web.Features.Profile
{
	public class ProfilePostRequestModelValidator : CashFluxAbstractValidator<ProfilePostRequestModel>
	{
		public ProfilePostRequestModelValidator(CashFluxDbContext context)
			: base(context)
		{
			RuleFor(model => model.Name).NotEmpty().MaximumLength(20);
			RuleFor(model => model.UserId).NotEmpty().MustAsync(HaveValidUserId)
				.WithMessage(model => $"User Fk '{model.UserId}' does not exist.");
		}

		protected async Task<bool> HaveValidUserId(string userId,
			CancellationToken cancellationToken)
		{
			return await Context.Users.SingleOrDefaultAsync(user => user.Id == userId, cancellationToken) != null;
		}
	}
}