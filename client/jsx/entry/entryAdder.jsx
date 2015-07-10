var EntryAdder = React.createClass({
    getInitialState: function () {
        return {
            name: '',
            amount: '',
            date: '',
            category: 'Various'
        }
    },
    handleChange: function (key) {
        return function (e) {
            var state = {};
            state[key] = e.target.value;
            this.setState(state);
        }.bind(this);
    },
    handleSubmit: function() {
        var date = this.state.date.split('.');
        date = date.map((x) => parseFloat(x));
        var self = this;
        $.ajax({
            url: '/_addEntry',
            contentType: 'application/json',
            method:'POST',
            data: JSON.stringify({
                name:this.state.name,
                amount:this.state.amount,
                category:this.state.category,
                day:date[0],
                month:date[1],
                year:date[2]
            }),
            success: function(data){
                if (data.redirect){
                    window.mitra.router.transitionTo(data.redirect);
                }
                else {
                    self.setState({errors: data.errors});
                }
            }
        });
    },
    render: function() {
        var currentTime = new Date();
        var timeString = currentTime.getDate() + '.'+ (currentTime.getMonth()+1) + '.' + currentTime.getFullYear();
        return (
            <div className='contentSegment'>
                <input className='entryInput' placeholder="Entry name" type='text' onChange={this.handleChange('name')}> </input>
                <input className='entryInput' placeholder="Amount" type='number' onChange={this.handleChange('amount')}> </input>
                <input className='entryInput' placeholder="DD.MM.YYYY" value={timeString} type='text' onChange={this.handleChange('date')}> </input>
                <input className='entryInput' placeholder="Category" type='text' onChange={this.handleChange('category')}> </input>
                <button form="entryAdded" value="Submit" onClick={this.handleSubmit} >Shit yo</button>
            </div>
        )
    }
});

