using DestinationV.Application.Interfaces;
using DestinationV.Domain.Entity.RouteEntity;

namespace DestinationV.Application.Queries
{
    public class RouteQuery: IQuery<Route>
    {
        public string Id { get; set; }

        public RouteQuery(string id)
        {
            Id = id;
        }
    }
}
