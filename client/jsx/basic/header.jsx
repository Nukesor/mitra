class Header extends React.Component {

    logout () {
        $.ajax({
            url: '/_logout',
            method:'POST',
            success: (data) => {
                if (data.redirect){
                    window.mitra.router.transitionTo(data.redirect);
                }
            }
        });
    }

    render () {
        return (
            <div className='header' >
                HEADER
                <button onClick={this.logout}>
                    Logout
                </button>
            </div>
        )
    }
}

