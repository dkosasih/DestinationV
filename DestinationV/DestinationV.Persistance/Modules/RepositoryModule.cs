using System.Reflection;
using Autofac;
using Autofac.Features.Variance;
using DestinationV.Domain.Entity.PlaceEntity;
using DestinationV.Domain.Entity.RouteEntity;
using DestinationV.Persistence.Repositories;

namespace DestinationV.Persistence.Modules
{
    public class RepositoryModule : Autofac.Module
    {
        protected override void Load(ContainerBuilder builder)
        {

            builder.RegisterAssemblyTypes(ThisAssembly)
                .AsImplementedInterfaces();

            builder.RegisterType<RouteRepository>().As<IRouteRepository>().InstancePerLifetimeScope();
            builder.RegisterType<PlaceRepository>().As<IPlaceRepository>().InstancePerLifetimeScope();
        }
    }
}
