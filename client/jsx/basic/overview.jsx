class Overview extends React.Component {
    constructor () {
        super();
        window.mitra.helper.loginCheck();
        this.navbarHandler = this.navbarHandler.bind(this);
        this.state = {view: 'recent', month: '', year: ''}
    }

    navbarHandler (state, month, year) {
        this.setState({
            view: state,
            month: (year === undefined ? '' : month),
            year: (year === undefined ? '' : year)
        });
    }

    render () {
        return (
            <div>
                <Header />
                <div className='container' >
                    <Navbar navbarHandler={this.navbarHandler} />
                    <div className='contentWrapper' >
                        <EntryAdder />
                        { this.state.view === 'recent' && <Recent /> }
                        { this.state.view === 'month' && <Month month={this.state.month} year={this.state.year} /> }
                    </div>
                </div>
            </div>
        )
    }
}

