class Entry extends React.Component {

    constructor () {
        super();
        this.handleButton = this.handleButton.bind(this);
    }

    handleButton () {
        $.ajax({
            url: '/_removeEntry',
            contentType: 'application/json',
            method:'POST',
            data: JSON.stringify({
                id:this.props.id
            }),
            success: (data) => {
                //TODO: Refreshing
            }
        });
    }

    render () {
        return (
            <tr>
                <td className="tableDate">{this.props.date}</td>
                <td className="tableName">{this.props.name}</td>
                <td className="tableCategory">{this.props.category}</td>
                <td className="tableAmount">{this.props.amount}</td>
                <td className="deleteButton">
                    <button onClick={this.handleButton}>
                        Delete Entry
                    </button>
                </td>
            </tr>
        )
    }
}

