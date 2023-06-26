from typing import ClassVar, Mapping, Sequence, Any, Dict, Optional, cast
from typing_extensions import Self

from viam.module.types import Reconfigurable
from viam.proto.app.robot import ComponentConfig
from viam.proto.common import ResourceName, Vector3
from viam.resource.base import ResourceBase
from viam.resource.types import Model, ModelFamily

from viamlabs.service.speech import Speech
from viam.logging import getLogger

import time
import asyncio

LOGGER = getLogger(__name__)

class speechio(Sensor, Reconfigurable):
    MODEL: ClassVar[Model] = Model(ModelFamily("viamlabs", "speech"), "speechio")
    
    # create any class parameters here, 'some_pin' is used as an example (change/add as needed)
    some_pin: int

    # Constructor
    @classmethod
    def new(cls, config: ComponentConfig, dependencies: Mapping[ResourceName, ResourceBase]) -> Self:
        my_class = cls(config.name)
        my_class.reconfigure(config, dependencies)
        return my_class

    # Validates JSON Configuration
    @classmethod
    def validate(cls, config: ComponentConfig):
        # here we validate config, the following is just an example and should be updated as needed
        some_pin = config.attributes.fields["some_pin"].number_value
        if some_pin == "":
            raise Exception("A some_pin must be defined")
        return

    # Handles attribute reconfiguration
    def reconfigure(self, config: ComponentConfig, dependencies: Mapping[ResourceName, ResourceBase]):
        # here we initialize the resource instance, the following is just an example and should be updated as needed
        self.some_pin = int(config.attributes.fields["some_pin"].number_value)
        return

    """ Implement the methods the Viam RDK defines for the Speech API (viamlabs:service:speech) """

    async def get_readings(self, extra: Optional[Dict[str, Any]] = None, **kwargs):
        # add logic to generate readings here

        # return readings as a dict
        return {"hello": "world"}
