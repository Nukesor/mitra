class Recent extends React.Component {
    constructor () {
        super();
        this.state = {data:{}};
        this.getData = this.getData.bind(this);
        this.refreshData = this.refreshData.bind(this);
    }

    componentDidMount () {
        this.getData();
    }

    getData () {
        $.ajax({
            url:'/_lastTransactions',
            contentType: 'application/json',
            method: 'POST',
            success: (data) => {
                if (data.entries) {
                    this.setState({data: data.entries}) ;
                }
            }
        })
    }

    refreshData () {
        this.getData();
    }

    render () {
        var entries = []
        for (var entry in this.state.data) {
            entries.push(<Entry {...this.state.data[entry]} refreshData={this.refreshData} key={entry}/>);
        }
        return <ul> {entries} </ul>
    }
}

