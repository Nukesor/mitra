export default class Category extends React.Component {
    constructor () {
        super();
    }

    render () {
        var entries = []
        console.log(this.state.data);
        for (var entry in this.state.data) {
            entries.push(<Entry refreshData={this.refreshData} {...this.state.data[entry]} key={entry}/>);
        }
        return (
            <div>
                <p> {this.props.category} </p>
                <ul> {entries} </ul>
            </div>
        )
    }
}

