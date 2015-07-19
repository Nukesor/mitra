class Register extends React.Component {
    constructor () {
        super();
        this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {username: '', password: '', email: '', errors: {}};
    }

    handleChange (key) {
        return (e) => {
            var state = {};
            state[key] = e.target.value;
            this.setState(state);
        }
    }

    handleSubmit () {
        $.ajax({
            url: '/_register',
            contentType: 'application/json',
            method:'POST',
            data: JSON.stringify({
                username:this.state.username,
                password:this.state.password,
                email:this.state.email
            }),
            success: (data) => {
                if (data.redirect) {
                    window.mitra.router.transitionTo(data.redirect);
                } else {
                    this.setState({ errors: data.errors });
                }
            }
        });
    }

    render () {
        return (
            <div className="loginContainer">
                <form className="loginWindow">
                    <div>
                        { this.state.errors.user ? <div className='error'> {this.state.errors.user} </div> : '' }
                        <input placeholder="Username" onChange={this.handleChange('username')}  type="text"></input>
                    </div>
                    <div>
                        { this.state.errors.email ? <div className='error'> {this.state.errors.email } </div> : '' }
                        <input placeholder="Email" onChange={this.handleChange('email')} type="text"></input>
                    </div>
                    <div>
                        { this.state.errors.password ? <div className='error'> {this.state.errors.password} </div> : '' }
                        <input placeholder="Password" onChange={this.handleChange('password')} type="password"></input>
                    </div>
                </form>
                <button form="loginWindow" value="Submit" onClick={this.handleSubmit} >Shit yo</button>
            </div>
        )
    }
}

