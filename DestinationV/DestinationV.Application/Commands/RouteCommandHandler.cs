using System;
using System.Threading;
using System.Threading.Tasks;
using DestinationV.Application.Enums;
using DestinationV.Application.Interfaces;
using DestinationV.Domain.Entity.RouteEntity;
using MediatR;

namespace DestinationV.Application.Commands
{
    public class RouteCommandHandler : ICommandHandler<RouteCommand>
    {
        private readonly IRouteRepository _routeRepository;

        public RouteCommandHandler(IRouteRepository routeRepository)
        {
            _routeRepository = routeRepository;
        }

        public async Task<Unit> Handle(RouteCommand command, CancellationToken cancellationToken)
        {
            var routeEntity = new Route();
            if (command.Route != null)
            {
                routeEntity = MapRouteViewModelToRouteEntity(command.Route);
            }

            switch (command.OperationType)
            {
                case OperationType.Add:
                    await _routeRepository.Add(routeEntity);
                    break;
                case OperationType.Delete:
                    await _routeRepository.Delete(command.Id);
                    break;
                case OperationType.Update:
                    await _routeRepository.Update(command.Id, routeEntity);
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }

            return Unit.Value;
        }

        private Route MapRouteViewModelToRouteEntity(Queries.Route routeVm)
        {
            return new Route
            {
                OriginId = routeVm.Origin.Id,
                DestinationId = routeVm.Destination.Id,
                DepartUtc = routeVm.DepartUtc
            };
        }

    }
}
