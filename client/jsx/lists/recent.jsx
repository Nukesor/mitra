class Recent extends React.Component {
    constructor () {
        super();
        this.state = {data:{}};
    }

    componentDidMount () {
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

    render () {
        var entries = []
        for (var entry in this.state.data) {
            entries.push(<Entry {...this.state.data[entry]} key={entry}/>);
        }
        return <ul> {entries} </ul>
    }
}

