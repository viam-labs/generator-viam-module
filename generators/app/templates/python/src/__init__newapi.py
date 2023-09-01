"""
This file registers the model with the Python SDK
"""

from viam.resource.registry import Registry, ResourceCreatorRegistration, ResourceRegistration

from .api import <%= api_name %>Client, <%= api_name %>RPCService, <%= api_name %>
from .<%= name %> import <%= name %>

Registry.register_subtype(ResourceRegistration(<%= api_name %>, <%= api_name %>RPCService, lambda name, channel: <%= api_name %>Client(name, channel)))

Registry.register_resource_creator(<%= api_name %>.SUBTYPE, <%= name %>.MODEL, ResourceCreatorRegistration(<%= name %>.new))