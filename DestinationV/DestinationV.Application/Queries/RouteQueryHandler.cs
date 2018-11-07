using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DestinationV.Application.Interfaces;
using DestinationV.Domain.Entity.RouteEntity;

namespace DestinationV.Application.Queries
{
    public class RouteQueryHandler: IQueryHandler<RouteQuery, Route>, IQueryHandler<RoutesQuery, IList<Route>>
    {
        private readonly IRouteRepository _routeRepository;

        public RouteQueryHandler(IRouteRepository routeRepository)
        {
            _routeRepository = routeRepository;
        }

        public async Task<Route> Handle(RouteQuery query, CancellationToken cancellationToken)
        {
            return MapRouteToViewModel(await _routeRepository.GetById(query.Id));
        }

        public async Task<IList<Route>> Handle(RoutesQuery query, CancellationToken cancellationToken)
        {
            return  MapRoutesToViewModel(await _routeRepository.GetAll());
        }

        private Route MapRouteToViewModel(Domain.Entity.RouteEntity.Route route)
        {
            return new Route
            {
                Id = route.Id,
                Origin = new Place
                {
                    Id = route.Origin.Id,
                    Name = route.Origin.Name
                },
                Destination = new Place
                {
                    Id = route.Destination.Id,
                    Name = route.Destination.Name
                },
                DepartUtc = route.DepartUtc

            };
        }

        private IList<Route> MapRoutesToViewModel(IList<Domain.Entity.RouteEntity.Route> routes)
        {
            return routes.Select(MapRouteToViewModel).ToList();
        }
    }
}
