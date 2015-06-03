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
        <Route name="register" path="/register" handler={Register}/>
        <Route name="overview" path="/overview" handler={Overview}/>
        <Route name="impressum" path="/impressum" handler={Impressum}/>
    </Route>
);

window.mitra = {};
window.mitra.router = ReactRouter.create({
    routes:routes,
    location:ReactRouter.HistoryLocation}
);

window.mitra.router.run(function(Handler) {
    React.render(<Handler/>, document.body);
});

