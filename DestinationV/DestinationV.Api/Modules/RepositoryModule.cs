using Autofac;
using DestinationV.Domain.Entity.PlaceEntity;
using DestinationV.Domain.Entity.RouteEntity;
using DestinationV.Persistence.Repositories;

namespace DestinationV.Api.Modules
{
    public class RepositoryModule : Autofac.Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<RouteRepository>().As<IRouteRepository>().InstancePerLifetimeScope();
            builder.RegisterType<PlaceRepository>().As<IPlaceRepository>().InstancePerLifetimeScope();
        }
    }
}
