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
    getInitialState: function () {
        return {
            name: '',
            amount: '',
            date: '',
            category: 'Various'
        }
    },
    handleChange: function (key) {
        return function (e) {
            var state = {};
            state[key] = e.target.value;
            this.setState(state);
        }.bind(this);
    },
    handleSubmit: function() {
        var date = this.state.date.split('-');
        date = date.map((x) => parseFloat(x));
        $.ajax({
            url: '/_addEntry',
            contentType: 'application/json',
            method:'POST',
            data: JSON.stringify({
                name:this.state.name,
                amount:this.state.amount,
                category:this.state.category,
                day:date[2],
                month:date[1],
                year:date[0]
            }),
            success: function(data){
                if (data.redirect){
                    window.mitra.router.transitionTo(data.redirect);
                }
                else {
                    self.setState({errors: data.errors});
                }
            }
        });
    },
    render: function() {
        return (
            <div>
                <input className='entryName' placeholder="Entry name" type='text' onChange={this.handleChange('name')}> </input>
                <input className='entryAmount' placeholder="Amount" type='number' onChange={this.handleChange('amount')}> </input>
                <input className='entryDate' placeholder="DD-MM-YYYY" type='date' onChange={this.handleChange('date')}> </input>
                <input className='entryCategory' placeholder="Category" type='text' onChange={this.handleChange('category')}> </input>
                <button form="entryAdded" value="Submit" onClick={this.handleSubmit} >Shit yo</button>
                </div>
        )
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
        return (
            <tr>
                <td className="tableDate">{this.props.date}</td>
                <td className="tableName">{this.props.name}</td>
                <td className="tableCategory">{this.props.category}</td>
                <td className="tableAmount">{this.props.amount}</td>
            </tr>)
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

