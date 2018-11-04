using DestinationV.Application.Enums;
using DestinationV.Application.Interfaces;
using DestinationV.Application.Queries;

namespace DestinationV.Application.Commands
{
    public class RouteCommand : ICommand
    {
        public OperationType OperationType { get; set; }
        public string Id { get; set; }

        public Route Route { get; set; }

        public RouteCommand(string id)
        {
            OperationType = OperationType.Delete;
            Id = id;
        }

        public RouteCommand(Route route)
        {
            OperationType = OperationType.Add;
            Route = route;
        }

        public RouteCommand(string id, Route route)
        {
            OperationType = OperationType.Update;
            Route = route;
            Id = id;
        }
    }
}
