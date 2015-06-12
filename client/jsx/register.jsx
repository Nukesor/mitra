var Register = React.createClass({
    getInitialState: function(){
        return {
            username: 'Username',
            password: 'Password',
            email: 'Email'
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
            url: '/_register',
            contentType: 'application/json',
            method:'POST',
            data: JSON.stringify({
                username:this.state.username,
                password:this.state.password,
                email:this.state.email
            }),
            success: function(data){
                if (data.registered){
                    console.log('Done');
                }
                if (data.username){
                    console.log(data.username[0]);
                }
                if (data.password){
                    console.log(data.password[0]);
                }
            }
        });
    },
    render: function() {
        return (
            <div className="loginContainer"> 
                <form className="loginWindow">
                    <div> 
                        <input placeholder="Username" onChange={this.handleChange('username')}  type="text"></input>
                    </div>
                    <div> 
                        <input placeholder="Email" onChange={this.handleChange('email')} type="text"></input>
                    </div>
                    <div> 
                        <input placeholder="Password" onChange={this.handleChange('password')} type="password"></input>
                    </div>
                </form>
                <button form="loginWindow" value="Submit" onClick={this.handleSubmit} >Shit yo</button>
            </div>
        )
    }
});

