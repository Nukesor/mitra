var Login = React.createClass({
    render: function() {
        return (
            <div className="loginContainer"> 
                <form className="loginWindow">
                    <div> 
                        <label for="username">Username</label> 
                        <input id="username" name="username" size="20" type="text"></input>
                    </div>
                    <div> 
                        <label for="password">Password</label> 
                        <input id="password" name="password" size="20" type="text"></input>
                    </div>
                </form>
            </div>
        )
    }
});

