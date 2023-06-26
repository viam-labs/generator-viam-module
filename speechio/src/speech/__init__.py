"""
This file registers the model with the Python SDK.
"""

from viamlabs.service.speech import Speech
from viam.resource.registry import Registry, ResourceCreatorRegistration

from .speechio import speechio

Registry.register_resource_creator(Speech.SUBTYPE, speechio.MODEL, ResourceCreatorRegistration(speechio.new, speechio.validate))
