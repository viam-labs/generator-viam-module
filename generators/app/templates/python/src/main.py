import asyncio
import sys

from viam.module.module import Module
from <%= api %> import <%= api_name %>
from .<%= name_sanitized %> import <%= name_sanitized %>

async def main():
    """This function creates and starts a new module, after adding all desired resources.
    Resources must be pre-registered. For an example, see the `__init__.py` file.
    """
    module = Module.from_args()
    module.add_model_from_registry(<%= api_name %>.SUBTYPE, <%= name_sanitized %>.MODEL)
    await module.start()

if __name__ == "__main__":
    asyncio.run(main())
