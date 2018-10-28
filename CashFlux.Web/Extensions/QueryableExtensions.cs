using System;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace CashFlux.Web.Extensions
{
	public static class QueryableExtensions
	{
		/// <summary>
		/// Includes given virtual properties onto queryable entities
		/// </summary>
		/// <param name="queryable"></param>
		/// <param name="includes">The properties to include</param>
		/// <typeparam name="TEntity"></typeparam>
		/// <returns>The queryable objects including the given include objects</returns>
		public static IQueryable<TEntity> Includes<TEntity>(
			this IQueryable<TEntity> queryable,
			params Expression<Func<TEntity, object>>[] includes) where TEntity : class
		{
			return includes.Aggregate(queryable, (current, includeProperty) => current.Include(includeProperty));
		}
	}
}