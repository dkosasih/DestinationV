using MediatR;

namespace DestinationV.Application.Interfaces
{
    public interface IQueryHandler<in T, TR> : IRequestHandler<T, TR> where T : IRequest<TR>
    {
    }
}
