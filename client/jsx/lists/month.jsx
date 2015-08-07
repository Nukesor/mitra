class Month extends React.Component {
    constructor () {
        super();
        this.state = {data:{}};
        this.getData = this.getData.bind(this);
        this.refreshData = this.refreshData.bind(this);
    }

    componentDidMount () {
        window.mitra.eventManager.addListener('month', 'entryAdded', this.refreshData);
        this.getData(this.props.month, this.props.year);
    }

    componentWillReceiveProps (nextProps) {
        this.getData(nextProps.month, nextProps.year);
    }

    refreshData () {
        this.getData(this.props.month, this.props.year);
    }

    getData (month, year) {
        $.ajax({
            url:'/_monthly',
            contentType: 'application/json',
            method: 'POST',
            data: JSON.stringify({
                month:month,
                year:year
            }),
            success: (data) => {
                if (data.entries) {
                    this.setState({data: data.entries});
                }
            }
        })
    }

    render () {
        var entries = []
        for (var entry in this.state.data) {
            entries.push(<Entry refreshData={this.refreshData} {...this.state.data[entry]} key={entry}/>);
        }
        return <ul> {entries} </ul>
    }
}

