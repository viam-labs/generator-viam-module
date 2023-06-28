"""
This file outlines the general structure for the API around a custom, modularized <%- api_family %>.

It defines the abstract class definition that all concrete implementations must follow,
the gRPC service that will handle calls to the service,
and the gRPC client that will be able to make calls to this service.

In this example, the ``<%= api_name %>`` abstract class defines what functionality is required for all <%= api_name %> <%- api_family %>s.
It extends ``<%- api_family == 'component' ? 'Component' : 'Service'%>Base``, as all <%- api_family %> types must.
It also defines its specific ``SUBTYPE``, which is used internally to keep track of supported types.

The ``<%= api_name %>RPCService`` implements the gRPC service for the <%= api_name %> <%- api_family %>. This will allow other robots and clients to make
requests of the <%= api_name %> <%- api_family %>. It extends both from ``<%= api_name %>ServiceBase`` and ``RPCServiceBase``.
The former is the gRPC service as defined by the proto, and the latter is the class that all gRPC services must inherit from.

Finally, the ``<%= api_name %>Client`` is the gRPC client for a <%= api_name %> <%- api_family %>. It inherits from <%= api_name %>Service since it implements
 all the same functions. The implementations are simply gRPC calls to some remote <%= api_name %> <%- api_family %>.

To see how this custom modular <%- api_family %> is registered, see the __init__.py file.
To see the custom implementation of this <%- api_family %>, see the <%= name %>.py file.
"""

import abc
from typing import Final, Sequence

from grpclib.client import Channel
from grpclib.server import Stream

from viam.resource.rpc_service_base import ResourceRPCServiceBase
from viam.resource.types import RESOURCE_TYPE_<%- api_family == 'component' ? 'COMPONENT' : 'SERVICE'%>, Subtype
from <%- api_family == 'component' ? 'viam.components.component_base' : 'viam.services.service_base'%> import <%- api_family == 'component' ? 'Component' : 'Service'%>Base

from ..proto.<%= api_name_lower %>_grpc import <%= api_name %>ServiceBase, <%= api_name %>ServiceStub

# update the below with actual methods for your API!
from ..proto.<%= api_name_lower %>_pb2 import EchoRequest, EchoResponse


class <%= api_name %>(<%- api_family == 'component' ? 'Component' : 'Service'%>Base):
    """Example service to use with the example module"""

    SUBTYPE: Final = Subtype("<%= namespace %>", RESOURCE_TYPE_SERVICE, "<%= api_name_lower %>")

    # update with actual API methods
    @abc.abstractmethod
    async def echo(self, text: str) -> str:
        ...

class <%= api_name %>RPCService(<%= api_name %>ServiceBase, ResourceRPCServiceBase):
    """Example gRPC service for the Speech service"""

    RESOURCE_TYPE = <%= api_name %>Service

    # update with actual API methods
    async def Echo(self, stream: Stream[EchoRequest, EchoResponse]) -> None:
        request = await stream.recv_message()
        assert request is not None
        name = request.name
        service = self.get_resource(name)
        resp = await service.say(request.text)
        await stream.send_message(EchoResponse(text=resp))

class <%= api_name %>Client(<%= api_name %>Service):
    """Example gRPC client for the Speech Service"""

    def __init__(self, name: str, channel: Channel) -> None:
        self.channel = channel
        self.client = <%= api_name %>ServiceStub(channel)
        super().__init__(name)

    # update with actual API methods
    async def echo(self, text: str) -> str:
        request = EchoRequest(name=self.name, text=text)
        response: EchoResponse = await self.client.Echo(request)
        return response.text