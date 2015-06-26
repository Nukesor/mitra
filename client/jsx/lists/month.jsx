var Month = React.createClass({
    getInitialState : function() {
        return {data:{}}
    },
    componentDidMount : function () {
        this.getData(this.props.month, this.props.year);
    },
    componentWillReceiveProps: function (nextProps) {
        this.getData(nextProps.month, nextProps.year);
    },
    getData: function(month, year) {
        var self = this;
        $.ajax({
            url:'/_monthly',
            contentType: 'application/json',
            method: 'POST',
            data: JSON.stringify({
                month:month,
                year:year
            }),
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

