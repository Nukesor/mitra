import Login from './account/login.js';
import Register from './account/register.js';

import Overview from './basic/overview.js';


import Eventmanager from './helper/eventManager.js';

var Route = ReactRouter.Route;
var RouteHandler = ReactRouter.RouteHandler;

class App extends React.Component {
    //    componentDidMount : function () {
    //        window.mitra.helper.loginCheck();
    //    }
    //
    render () {
        return (
            <div className="mainContainer">
                <RouteHandler />
            </div>
        )
    }
}

var routes = (
    <Route path="/" handler={App}>
        <Route name="root" path="/" handler={Overview} />
        <Route name="login" path="/login" handler={Login} />
        <Route name="register" path="/register" handler={Register} />
        <Route name="overview" path="/overview" handler={Overview} />
    </Route>
);

if (window.mitra === undefined) {
    window.mitra = {};
}

window.mitra.eventManager = new Eventmanager();

window.mitra.router = ReactRouter.create({
    routes:routes,
    location:ReactRouter.HistoryLocation}
);

window.mitra.router.run(function(Handler) {
    React.render(<Handler/>, document.body);
});


