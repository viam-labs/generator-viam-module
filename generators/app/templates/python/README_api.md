# <%= api_name_lower %>-api

Proto API and grpc bindings for <%= api_name_lower %>

*<%= api_name_lower %>-api* provides Proto API and grpc bindings for <%= api_name_lower %> capabilities

## API

The <%= api_name_lower %> resource implements the following API:

### echo(text=*string*)

The *echo()* command takes:

* string: The string to echo back

## Using <%= api_name_lower %>-api with the Python SDK

Because this module uses a custom protobuf-based API, you must include this project in your client code.  One way to do this is to include it in your requirements.txt as follows:

```
<%= api_name_lower %>_api @ git+https://github.com/<%= api_namespace %>/<%= api_name_lower %>-api.git@main
```

You can now import and use it in your code as follows:

```
from <%= api_name_lower %>_python import <%= api_name %>
api = <%= api_name %>.from_robot(robot, name="<%= api_name_lower %>")
api.echo(...)
```

See client.py for an example.

## Using <%= api_name_lower %> with the Golang SDK

Because this module uses a custom protobuf-based API, you must import and use in your client code as follows:

``` go
import audioout "github.com/<%= api_namespace %>/<%= api_name_lower %>-api/src/<%= api_name_lower %>_go"

api, err := <%= api_name_lower %>.FromRobot(robot, "<%= api_name_lower %>")
fmt.Println("err", err)
api.Echo(context.Background(), "hi")
```

See client.go for an example.

## Building

To rebuild the GRPC bindings, run:

``` bash
make generate
```

Then, in `src/<%= api_name_lower %>_python/grpc/<%= api_name_lower %>_grpc.py change:

``` python
import <%= api_name_lower %>_pb2
```

to:

``` python
from . import <%= api_name_lower %>_pb2
```

Then, update the version in pyproject.toml
