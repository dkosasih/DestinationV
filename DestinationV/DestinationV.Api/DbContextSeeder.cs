using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using DestinationV.Domain.Entity.PlaceEntity;
using DestinationV.Domain.Entity.RouteEntity;
using DestinationV.Persistence;

namespace DestinationV.Api
{
    // TODO: remove this entire class when moving to persistence database
    public static class DbContextSeeder
    {
        public static void EnsureDbSeeded(this SchedulingDbContext context)
        {
            // ensure data is clean 
            context.Routes.RemoveRange(context.Routes);
            context.Places.RemoveRange(context.Places);
            context.SaveChanges();

            var unionSt = new Place {Id = "Station0118", Name = "Union Street"};
            var winchester = new Place {Id = "Station0001", Name = "Winchester"};

            context.Places.Add(unionSt);
            context.Places.Add(winchester);
            context.SaveChanges();

            var routes = new List<Route>
            {
                new Route
                {
                    OriginId = unionSt.Id,
                    DestinationId = winchester.Id,
                    DepartUtc = (new DateTime(2018, 09, 01))
                },
                new Route
                {
                    OriginId = winchester.Id,
                    DestinationId = unionSt.Id,
                    DepartUtc = (new DateTime(2018, 10, 01))
                }
            };


            context.Routes.AddRange(routes);
            context.SaveChanges();
        }
    }
}
