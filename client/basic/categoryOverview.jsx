import Event from '../helper/event.js'

export default class CategoryOverview extends React.Component {
    constructor () {
        super();
        this.timeViewHandler = this.timeViewHandler.bind(this);
        this.categoryViewHandler = this.categoryViewHandler.bind(this);
    }

    timeViewHandler () {
        var event = {name:'changeView', view:'time'}
        window.mitra.eventManager.spreadEvent(event);
    }

    categoryViewHandler () {
        var event = {name:'changeView', view:'category'}
        window.mitra.eventManager.spreadEvent(event);
    }

    render () {
        return (
            <div className='navigation'>
                <button onClick={this.categoryViewHandler}> Time View </button>
                <button onClick={this.timeViewHandler} > Category View</button>
            </div>
        )
    }
}

