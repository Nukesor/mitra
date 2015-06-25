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
                    <Navbar />
                </div>
                <div>
                    <Recent />
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        )
    }
});

