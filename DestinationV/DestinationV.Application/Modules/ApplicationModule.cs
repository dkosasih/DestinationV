using System;
using System.Collections.Generic;
using System.Text;
using Autofac;
using Autofac.Features.Variance;
using DestinationV.Domain.Entity.PlaceEntity;
using DestinationV.Domain.Entity.RouteEntity;
using MediatR;

namespace DestinationV.Application.Modules
{
    public class ApplicationModule : Autofac.Module
    {
        protected override void Load(ContainerBuilder builder)
        {

            builder.RegisterAssemblyTypes(ThisAssembly)
                .AsImplementedInterfaces();

            // enables contravariant Resolve() for interfaces with single contravariant ("in") arg
            builder
                .RegisterSource(new ContravariantRegistrationSource());

            // mediator itself
            builder
                .RegisterType<Mediator>()
                .As<IMediator>()
                .InstancePerLifetimeScope();

            // request handlers
            builder.Register<ServiceFactory>(context =>
            {
                var componentContext = context.Resolve<IComponentContext>();
                return t =>
                {
                    object o;
                    return componentContext.TryResolve(t, out o) ? o : null;
                };
            });
        }
    }
}
