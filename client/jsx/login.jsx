var Login = React.createClass({
    getInitialState: function(){
        return {
            username: 'Username',
            password: 'Password'
        };
    },
    handleChange: function (key) {
        return function (e) {
            var state = {};
            state[key] = e.target.value;
            this.setState(state);
        }.bind(this);
    },
    handleSubmit: function() {
        $.ajax({
            url: '/_login',
            contentType: 'application/json',
            method:'POST',
            data: JSON.stringify({
                username:this.state.username,
                password:this.state.password
            }),
            success: function(data){
                if (data.redirect){
                    window.mitra.router.transitionTo(data.redirect);
                }
            }
        });
    },
    render: function() {
        return (
            <div className="loginContainer"> 
                <form className="loginWindow">
                    <div> 
                        <input placeholder="Username or Email" onChange={this.handleChange('username')} type="text"></input>
                    </div>
                    <div> 
                        <input placeholder="Password" onChange={this.handleChange('password')} type="text"></input>
                    </div>
                </form>
                <button form="loginWindow" value="Submit" onClick={this.handleSubmit} >Shit yo</button>
            </div>
        )
    }
});

