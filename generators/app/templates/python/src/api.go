// Package <%= api_name_lower %> implements the <%= api %> API
package <%= api_name_lower %>

import (
	"context"

	"github.com/edaniels/golog"
	"go.viam.com/utils/rpc"

	pb "github.com/<%= api_namespace %>/<%= api_name_lower %>-api/src/<%= api_name_lower %>_go/grpc"
	"go.viam.com/rdk/resource"
	"go.viam.com/rdk/robot"
)

// API is the full API definition.
var API = resource.APINamespace("<%= api_namespace %>").WithServiceType("<%= api_name_lower %>")

// Named is a helper for getting the named <%= api_name %>'s typed resource name.
func Named(name string) resource.Name {
	return resource.NewName(API, name)
}

// FromRobot is a helper for getting the named <%= api_name %> from the given Robot.
func FromRobot(r robot.Robot, name string) (<%= api_name %>, error) {
	return robot.ResourceFromRobot[<%= api_name %>](r, Named(name))
}

func init() {
	resource.RegisterAPI(API, resource.APIRegistration[<%= api_name %>]{
		// Reconfigurable, and contents of reconfwrapper.go are only needed for standalone (non-module) uses.
		RPCServiceServerConstructor: NewRPCServiceServer,
		RPCServiceHandler:           pb.Register<%= api_name %>ServiceHandlerFromEndpoint,
		RPCServiceDesc:              &pb.<%= api_name %>Service_ServiceDesc,
		RPCClient: func(
			ctx context.Context,
			conn rpc.ClientConn,
			remoteName string,
			name resource.Name,
			logger golog.Logger,
		) (<%= api_name %>, error) {
			return NewClientFromConn(conn, remoteName, name, logger), nil
		},
	})
}

// <%= api_name %> defines the Go interface for the component (should match the protobuf methods.)
type <%= api_name %> interface {
	resource.Resource
	// replace with actual methods!
	Echo(ctx context.Context, text string) error
}

// serviceServer implements the <%= api_name %> RPC service from <%= api_name_lower %>.proto.
type serviceServer struct {
	pb.Unimplemented<%= api_name %>ServiceServer
	coll resource.APIResourceCollection[<%= api_name %>]
}

// NewRPCServiceServer returns a new RPC server for the <%= api_name %> API.
func NewRPCServiceServer(coll resource.APIResourceCollection[<%= api_name %>]) interface{} {
	return &serviceServer{coll: coll}
}

// replace with methods that match your proto!
func (s *serviceServer) Echo(ctx context.Context, req *pb.EchoRequest) (*pb.EchoResponse, error) {
	g, err := s.coll.Resource(req.Name)
	if err != nil {
		return nil, err
	}
	err = g.Echo(ctx, req.Text)
	if err != nil {
		return nil, err
	}
	return &pb.EchoResponse{}, nil
}

// NewClientFromConn creates a new <%= api_name %> RPC client from an existing connection.
func NewClientFromConn(conn rpc.ClientConn, remoteName string, name resource.Name, logger golog.Logger) <%= api_name %> {
	sc := newSvcClientFromConn(conn, remoteName, name, logger)
	return clientFromSvcClient(sc, name.ShortName())
}

func newSvcClientFromConn(conn rpc.ClientConn, remoteName string, name resource.Name, logger golog.Logger) *serviceClient {
	client := pb.New<%= api_name %>ServiceClient(conn)
	sc := &serviceClient{
		Named:  name.PrependRemote(remoteName).AsNamed(),
		client: client,
		logger: logger,
	}
	return sc
}

type serviceClient struct {
	resource.Named
	resource.AlwaysRebuild
	resource.TriviallyCloseable
	client pb.<%= api_name %>ServiceClient
	logger golog.Logger
}

// client is an <%= api_name %> client.
type client struct {
	*serviceClient
	name string
}

func clientFromSvcClient(sc *serviceClient, name string) <%= api_name %> {
	return &client{sc, name}
}

// replace with actual methods that match your proto!
func (c *client) Echo(ctx context.Context, text string) error {
	_, err := c.client.Echo(ctx, &pb.EchoRequest{
		Name:      c.name,
		Text:  text
	})
	if err != nil {
		return err
	}
	return nil
}
