export default class EntryAdder extends React.Component {
    constructor () {
        var currentTime = new Date();
        var timeString = currentTime.getDate() + '.'+ (currentTime.getMonth()+1) + '.' + currentTime.getFullYear();
        super();
        this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {name: '', amount: '', date: timeString, category: 'Various'};
    }

    handleChange (key) {
        return (e) => {
            var state = {};
            state[key] = e.target.value;
            this.setState(state);
        }
    }

    handleSubmit () {
        var date = this.state.date.split('.');
        date = date.map((x) => parseFloat(x));
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
            success: (data) => {
                if (data.redirect){
                    window.mitra.router.transitionTo(data.redirect);
                }
                //TODO: Api needs to be adjusted
                //                else if (data.errors) {
                //                    this.setState({errors: data.errors});
                //                }
                else {
                    var eventAdded = new Event('entryAdded');
                    window.mitra.eventManager.spreadEvent(eventAdded);
                }
            }
        });
    }

    render () {
        return (
            <div className='contentSegment'>
                <input className='entryInput' placeholder="Entry name" type='text' onChange={this.handleChange('name')}> </input>
                <input className='entryInput' placeholder="Amount" type='number' onChange={this.handleChange('amount')}> </input>
                <input className='entryInput' placeholder="DD.MM.YYYY" value={this.state.date} type='text' onChange={this.handleChange('date')}> </input>
                <input className='entryInput' placeholder="Category" type='text' onChange={this.handleChange('category')}> </input>
                <button form="entryAdded" value="Submit" onClick={this.handleSubmit} >Shit yo</button>
            </div>
        )
    }
}

