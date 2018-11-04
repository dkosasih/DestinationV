using MediatR;

namespace DestinationV.Application.Interfaces
{
    public interface IQuery<out T> : IRequest<T>
    {
    }
}
