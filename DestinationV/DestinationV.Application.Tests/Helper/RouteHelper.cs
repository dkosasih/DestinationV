using System;
using System.Collections.Generic;
using DestinationV.Domain.Entity.PlaceEntity;
using DestinationV.Domain.Entity.RouteEntity;

namespace DestinationV.Application.Tests.Helper
{
   public static class RouteHelper
    {
        public static IList<Route> CreateMockRoutes()
        {
            var traralgon = new Place { Id = "Station0118", Name = "Traralgon" };
            var sthCross = new Place { Id = "Station0001", Name = "Southern Cross" };

            var routes = new List<Route>
            {
                new Route
                {
                    Id = "trl-sthcrs",
                    OriginId = traralgon.Id,
                    Origin = traralgon,
                    DestinationId = sthCross.Id,
                    Destination = sthCross,
                    DepartUtc = (new DateTime(2018, 09, 01))
                },
                new Route
                {
                    Id = "sthcrs-trl",
                    OriginId = sthCross.Id,
                    Origin = sthCross,
                    DestinationId = traralgon.Id,
                    Destination = traralgon,
                    DepartUtc = (new DateTime(2018, 10, 01))
                }
            };

            return routes;
        }
    }
}
