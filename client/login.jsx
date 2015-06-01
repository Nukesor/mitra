var Login = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    getInitialState: function(){
        return {
            username: 'Username',
            password: 'Password'
        };
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
                if (data.logged_in){
                    console.log(this.props);
                    this.props.router.transitionTo('overview');
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
                        <label htmlFor="username"> Username or Email </label> 
                        <input valueLink={this.linkState('username')} type="text"></input>
                    </div>
                    <div> 
                        <label htmlFor="password">Password</label> 
                        <input valueLink={this.linkState('password')} type="text"></input>
                    </div>
                </form>
                <button form="loginWindow" value="Submit" onClick={this.handleSubmit} >Shit yo</button>
            </div>
        )
    }
});

