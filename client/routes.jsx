var Route = ReactRouter.Route;
var RouteHandler = ReactRouter.RouteHandler;

var App = React.createClass({
    render: function() {
        return (
            <div className="mainContainer">
                <RouteHandler />
            </div>
        )
    }
});

var routes = (
    <Route handler={App} path="/">
        <Route name="login" path="/login" handler={Login}/>
        <Route name="overview" path="/overview" handler={Overview}/>
        <Route name="impressum" path="/impressum" handler={Impressum}/>
    </Route>
);

var router = ReactRouter.create({
    routes:routes,
    location:ReactRouter.HistoryLocation}
);

router.run(function(Handler) {
    React.render(<Handler/>, document.body);
});

