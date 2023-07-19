"""
This file registers the model with the Python SDK.
"""

from viam.components.camera import Camera
from viam.resource.registry import Registry, ResourceCreatorRegistration

from .mycamera import mycamera

Registry.register_resource_creator(Camera.SUBTYPE, mycamera.MODEL, ResourceCreatorRegistration(mycamera.new, mycamera.validate))
