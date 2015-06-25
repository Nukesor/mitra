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
    getInitialState : function() {
        return {data:{}}
    },
    componentDidMount : function() {
        var self = this;
        $.ajax({
            url:'/_lastTransactions',
            contentType: 'application/json',
            method: 'POST',
            success: function (data) {
                if (data.entries) {
                    self.setState({data: data.entries}) ;
                }
            }
        })
    },
    render: function() {
        var entries = []
        for (var entry in this.state.data) {
            entries.push(<Entry {...this.state.data[entry]} key={entry}/>);
        }
        return <ul> {entries} </ul>
    }
});

var Entry = React.createClass({
    render: function() {
        return <div>{this.props.date}</div>
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

