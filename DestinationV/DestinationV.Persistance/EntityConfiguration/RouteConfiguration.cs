using DestinationV.Domain.Entity.RouteEntity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DestinationV.Persistence.EntityConfiguration
{
    public class RouteConfiguration: IEntityTypeConfiguration<Route>
    {

        public void Configure(EntityTypeBuilder<Route> builder)
        {
            builder.HasKey(r => r.Id);
            builder.Property(r=>r.DepartUtc).HasColumnType("datetime");
            builder.Property(r => r.OriginId);
            builder.Property(r => r.DestinationId);
        }
    }
}
