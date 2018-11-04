using DestinationV.Domain.Entity.PlaceEntity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DestinationV.Persistence.EntityConfiguration
{
    public class PlaceConfiguration : IEntityTypeConfiguration<Place>
    {
        public void Configure(EntityTypeBuilder<Place> builder)
        {
            builder.HasKey(r => r.Id);
            builder.Property(r => r.Name);
        }
    }
}
