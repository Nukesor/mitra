var Recent = React.createClass({
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

