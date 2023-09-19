"""
This file registers the model with the Python SDK.
"""

from <%= api %> import <%= api_name %>
from viam.resource.registry import Registry, ResourceCreatorRegistration

from .<%= name_sanitized %> import <%= name_sanitized %>

Registry.register_resource_creator(<%= api_name %>.SUBTYPE, <%= name_sanitized %>.MODEL, ResourceCreatorRegistration(<%= name_sanitized %>.new, <%= name_sanitized %>.validate))
