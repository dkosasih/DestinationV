using System;
using System.Collections.Generic;
using System.Text;
using MediatR;

namespace DestinationV.Application.Interfaces
{
    public interface ICommandHandler<in T> : IRequestHandler<T> where T : IRequest
    {
    }
}
