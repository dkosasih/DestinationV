using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DestinationV.Domain.Entity.PlaceEntity;
using Microsoft.EntityFrameworkCore;

namespace DestinationV.Persistence.Repositories
{
    public class PlaceRepository : IPlaceRepository
    {
        private readonly SchedulingDbContext _schedulingDbContext;

        public PlaceRepository(SchedulingDbContext schedulingDbContext)
        {
            _schedulingDbContext = schedulingDbContext;
        }

        public async Task<Place> GetById(string id)
        {
            return await _schedulingDbContext.Places.SingleOrDefaultAsync(r => r.Id == id);
        }
    }
}
