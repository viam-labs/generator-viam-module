from typing import ClassVar, Mapping, Sequence, Any, Dict, Optional, Tuple, Final, List, cast
from typing_extensions import Self

from typing import Final, List, NamedTuple, Optional, Tuple, Union

from PIL.Image import Image

from viam.media.video import NamedImage
from viam.proto.common import ResponseMetadata


from viam.components.camera import DistortionParameters, IntrinsicParameters, RawImage



from viam.module.types import Reconfigurable
from viam.proto.app.robot import ComponentConfig
from viam.proto.common import ResourceName, Vector3
from viam.resource.base import ResourceBase
from viam.resource.types import Model, ModelFamily

from viam.components.camera import Camera
from viam.logging import getLogger

import time
import asyncio

LOGGER = getLogger(__name__)

class mycamera(Camera, Reconfigurable):
    
    """
    Camera represents any physical hardware that can capture frames.
    """
    class Properties(NamedTuple):
        """The camera's supported features and settings"""
        supports_pcd: bool
        """Whether the camera has a valid implementation of ``get_point_cloud``"""
        intrinsic_parameters: IntrinsicParameters
        """The properties of the camera"""
        distortion_parameters: DistortionParameters
        """The distortion parameters of the camera"""
    

    MODEL: ClassVar[Model] = Model(ModelFamily("viamlabs", "camera"), "mycamera")
    
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

    """ Implement the methods the Viam RDK defines for the Camera API (rdk:component:camera) """

    
    async def get_image(self, mime_type: str = "", *, timeout: Optional[float] = None, **kwargs) -> Union[Image, RawImage]:
        """Get the next image from the camera as an Image or RawImage.
        Be sure to close the image when finished.

        NOTE: If the mime type is ``image/vnd.viam.dep`` you can use :func:`viam.media.video.RawImage.bytes_to_depth_array`
        to convert the data to a standard representation.

        Args:
            mime_type (str): The desired mime type of the image. This does not guarantee output type

        Returns:
            Image | RawImage: The frame
        """
        ...

    
    async def get_images(self, *, timeout: Optional[float] = None, **kwargs) -> Tuple[List[NamedImage], ResponseMetadata]:
        """Get simultaneous images from different sensors, along with associated metadata.
        This should not be used for getting a time series of images from the same sensor.

        Returns:
            Tuple[List[NamedImage], ResponseMetadata]:
                - List[NamedImage]:
                  The list of images returned from the camera system.

                - ResponseMetadata:
                  The metadata associated with this response
        """
        ...

    
    async def get_point_cloud(self, *, timeout: Optional[float] = None, **kwargs) -> Tuple[bytes, str]:
        """
        Get the next point cloud from the camera. This will be
        returned as bytes with a mimetype describing
        the structure of the data. The consumer of this call
        should encode the bytes into the formatted suggested
        by the mimetype.

        To deserialize the returned information into a numpy array, use the Open3D library.
        ::

            import numpy as np
            import open3d as o3d

            data, _ = await camera.get_point_cloud()

            # write the point cloud into a temporary file
            with open("/tmp/pointcloud_data.pcd", "wb") as f:
                f.write(data)
            pcd = o3d.io.read_point_cloud("/tmp/pointcloud_data.pcd")
            points = np.asarray(pcd.points)

        Returns:
            bytes: The pointcloud data.
            str: The mimetype of the pointcloud (e.g. PCD).
        """
        ...

    
    async def get_properties(self, *, timeout: Optional[float] = None, **kwargs) -> Properties:
        """
        Get the camera intrinsic parameters and camera distortion parameters

        Returns:
            Properties: The properties of the camera
        """
        ...

