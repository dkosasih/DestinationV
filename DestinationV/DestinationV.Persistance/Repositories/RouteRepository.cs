using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DestinationV.Domain.Entity.PlaceEntity;
using DestinationV.Domain.Entity.RouteEntity;
using Microsoft.EntityFrameworkCore;

namespace DestinationV.Persistence.Repositories
{
   public class RouteRepository: IRouteRepository
    {
        private readonly SchedulingDbContext _schedulingDbContext;

        public RouteRepository(SchedulingDbContext schedulingDbContext)
        {
            _schedulingDbContext = schedulingDbContext;
        }

        public async Task<Route> GetById(string id)
        {
            return await _schedulingDbContext.Routes.AsNoTracking().Include(r => r.Destination).Include(r => r.Origin).SingleOrDefaultAsync(r => r.Id == id);
        }

        public async Task<IList<Route>> GetAll()
        {
            return await _schedulingDbContext.Routes.AsNoTracking().Include(r => r.Destination).Include(r => r.Origin).ToListAsync();
        }

        public async Task Add(Route route)
        {
            if (route != null)
            {
                _schedulingDbContext.Routes.Add(route);
                await _schedulingDbContext.SaveChangesAsync();
            }
        }

        public async Task Delete(string id)
        {
            var route = await _schedulingDbContext.Routes.FindAsync(id);
            if (route != null)
            {
                _schedulingDbContext.Routes.Remove(route);
                await _schedulingDbContext.SaveChangesAsync();
            }
        }

        public async Task Update(string id, Route route)
        {
            var currentRoute = await _schedulingDbContext.Routes.FindAsync(id);
            if (currentRoute != null)
            {
                currentRoute.DestinationId = route.DestinationId;
                currentRoute.OriginId = route.OriginId;
                currentRoute.DepartUtc = route.DepartUtc;

                await _schedulingDbContext.SaveChangesAsync();
            }
        }
    }
}
