var Route = ReactRouter.Route;
var RouteHandler = ReactRouter.RouteHandler;

var App = React.createClass({
    render: function() {
        return (
            <div>
                <RouteHandler/>
            </div>
        )
    }
});

var routes = (
    <Route handler={App} path="/">
        <Route path="/login" handler={Login}/>
        <Route path="/overview" handler={Overview}/>
        <Route path="/impressum" handler={Impressum}/>
    </Route>
);

ReactRouter.run(routes, function(Handler) {
    React.render(<Handler/>, document.body);
});

