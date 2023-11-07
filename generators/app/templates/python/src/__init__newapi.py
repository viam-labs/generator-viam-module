"""
This file registers the model with the Python SDK.
"""

from viam.resource.registry import Registry, ResourceCreatorRegistration

from <%= api_name_lower %>_python import <%= api_name %>
from .<%= name_sanitized %> import <%= name_sanitized %>

Registry.register_resource_creator(<%= api_name %>.SUBTYPE, <%= name_sanitized %>.MODEL, ResourceCreatorRegistration(<%= name_sanitized %>.new))
