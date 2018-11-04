using System.Collections.Generic;
using System.Threading.Tasks;
using DestinationV.Domain.SeedWork;

namespace DestinationV.Domain.Entity.RouteEntity
{
    public interface IRouteRepository : IRepository<Route>
    {
        Task<IList<Route>> GetAll();
        Task Add(Route route);
        Task Delete(string id);
        Task Update(string id, Route route);
    }
}
