using DestinationV.Domain.Entity.PlaceEntity;
using DestinationV.Domain.Entity.RouteEntity;
using DestinationV.Persistence.EntityConfiguration;
using Microsoft.EntityFrameworkCore;

namespace DestinationV.Persistence
{
    public class SchedulingDbContext : DbContext
    {
        public DbSet<Place> Places{ get; set; }
        public DbSet<Route> Routes { get; set; }

        public SchedulingDbContext(DbContextOptions<SchedulingDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new PlaceConfiguration());
            builder.ApplyConfiguration(new RouteConfiguration());
        }
    }
}
