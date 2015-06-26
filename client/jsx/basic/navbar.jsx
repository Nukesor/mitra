var Navbar = React.createClass({
    getInitialState: function () {
        return {
            date: ''
        }
    },
    handleChange: function (key) {
        return function (e) {
            var state = {};
            state[key] = e.target.value;
            this.setState(state);
        }.bind(this);
    },
    recentHandler: function () {
        this.props.navbarHandler('recent');
    },
    sendMonth: function () {
        var date = this.state.date.split('-');
        date = date.map((x) => parseFloat(x));
        this.props.navbarHandler('month', date[1], date[0]);
    },
    render: function() {
        return (
            <div className='navBar'> 
                <button onClick={this.recentHandler}> Overview</button>
                <div>
                    <input className="entryDate" placeholder="Month" onChange={this.handleChange('date')} type="month"></input>
                    <button onClick={this.sendMonth} > Monthly</button>
                </div>
            </div>
        )
    }
});

