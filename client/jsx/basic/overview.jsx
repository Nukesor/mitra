var Overview = React.createClass({
    getInitialState: function () {
        return {
            view: 'recent',
            month: '',
            year: ''
        }
    },
    navbarHandler: function (state, month, year) {
        this.setState({
            view: state,
            month: (year === undefined ? '' : month),
            year: (year === undefined ? '' : year)
        });
    },
    render: function() {
        return (
            <div>
                <Header />
                <div>
                    <Navbar navbarHandler={this.navbarHandler} />
                    <div>
                        <EntryAdder />
                        { this.state.view === 'recent' && <Recent /> }
                        { this.state.view === 'month' && <Month month={this.state.month} year={this.state.year} /> }
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
});

