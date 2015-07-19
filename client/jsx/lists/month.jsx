class Month extends React.Component {
    constructor () {
        super();
        this.state = {data:{}};
        this.getData = this.getData.bind(this);
    }

    componentDidMount () {
        this.getData(this.props.month, this.props.year);
    }

    componentWillReceiveProps (nextProps) {
        this.getData(nextProps.month, nextProps.year);
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

