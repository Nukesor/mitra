class Entry extends React.Component {
    render () {
        return (
            <tr>
                <td className="tableDate">{this.props.date}</td>
                <td className="tableName">{this.props.name}</td>
                <td className="tableCategory">{this.props.category}</td>
                <td className="tableAmount">{this.props.amount}</td>
            </tr>
        )
    }
}

