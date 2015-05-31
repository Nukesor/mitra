var Login = React.createClass({
    getInitialState: function(){
        return {
            username: true,
            password: true
        }
    },
    handleSubmit: function() {
        $.ajax({
            url: '/_login',
            contentType: 'application/json',
            data: {username:name,password:passwd},
            success: function(data){
                console.log(success);
            }
        })
    },
    handleChange: function(field, e) {
        console.log(field)
        console.log(e)
        var nextState = this.state
        nextState[field] = e.target.checked
        this.setState(nextState)
    },
    render: function() {
        return (
            <div className="loginContainer"> 
                <form className="loginWindow">
                    <div> 
                        <label htmlFor="username">Username or Email</label> 
                        <input onChange={this.handleChange.bind(this,"username")} size="20" type="text"></input>
                    </div>
                    <div> 
                        <label htmlFor="password">Password</label> 
                        <input onChange={this.handleChange.bind(this,"password")} id="password" name="password" size="20" type="text"></input>
                    </div>
                </form>
                <button form="loginWindow" value="Submit" onClick={this.authenticate} >Shit yo</button>
            </div>
        )
    }
});

