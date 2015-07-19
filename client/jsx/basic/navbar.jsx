class Navbar extends React.Component {
    constructor () {
        super();
        this.handleChange.bind(this);
        this.handleHandler = this.handleHandler.bind(this);
        this.sentMonth = this.sentMonth.bind(this);
        var year = new Date().getFullYear();
        var month = new Date().getMonth()+1;
        month = month.toString();
        year = year.toString();
        this.state = {
            year: year,
            month: month,
            monthList: {1:'January',2:'February',3:'March',4:'April',5:'May',6:'June',7:'July',8:'August',9:'September',10:'October',11:'November',12:'December'}
        };
    }

    handleChange: function (key) {
        return function (e) {
            var state = {};
            state[key] = e.target.value;
            this.setState(state);
        }.bind(this);
    }

    recentHandler: function () {
        this.props.navbarHandler('recent');
    }

    sendMonth: function () {
        this.props.navbarHandler('month', parseInt(this.state.month), parseInt(this.state.year));
    }

    render: function() {
        var years = []
        for (var year = new Date().getFullYear(); year >= 2010; year--) {
            years.push(<option key={year.toString()} value={year.toString()}> {year}</option>);
        }

        var months = []
        for (var month in this.state.monthList) {
            months.push(<option key={month.toString(0)} value={month.toString()}> {this.state.monthList[month]}</option>);
        }

        return (
            <div className='navigation'>
                <button onClick={this.recentHandler}> Overview </button>
                <div>
                    <select name="months" id="months" onChange={this.handleChange('month')} defaultValue={this.state.month}>
                    {months}
                    </select>
                    <select name="years" id="years" onChange={this.handleChange('year')}>
                    {years}
                    </select>

                    <button onClick={this.sendMonth} > Monthly</button>
                </div>
            </div>
        )
    }
}

