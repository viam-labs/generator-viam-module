"""
This file registers the model with the Python SDK.
"""

from viam.resource.registry import Registry, ResourceRegistration

from .api import <%= api_name %>Client, <%= api_name %>RPCService, <%= api_name %>

Registry.register_subtype(ResourceRegistration(<%= api_name %>, <%= api_name %>RPCService, lambda name, channel: <%= api_name %>Client(name, channel)))
