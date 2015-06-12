var Overview = React.createClass({
    render: function() {
        return (
            <div>
                <div>
                    <Header />
                </div>
                <div>
                    <EntryAdder />
                </div>
                <div>
                    <Sidebar />
                </div>
                <div>
                    <Display />
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        )
    }
});

var Header = React.createClass({
    render: function() {
        return <div> HEADER </div>
    }
});

var EntryAdder = React.createClass({
    render: function() {
        return <div> </div>
    }
});

var Display = React.createClass({
    render: function() {
        return <div> DISPLAY </div>
    }
});

var Sidebar = React.createClass({
    render: function() {
        return <div> SIDEBAR </div>
    }
});

var Footer = React.createClass({
    render: function() {
        return <div> FOOTER </div>
    }
});

