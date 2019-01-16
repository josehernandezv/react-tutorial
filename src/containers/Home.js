import React, { PureComponent } from 'react';
import MatchCard from '../components/matches/MatchCard';

class Home extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            matches: [],
            windowSize: window.innerWidth
        }
    }
    
    componentDidMount() {
        fetch('https://mejenga-8c3e2.firebaseio.com/matches.json')
            .then(response => {
                return response.json()
            })
            .then(data => {
                const matches = this.objectToArray(data).map(item => {
                    return {
                        ...item,
                        date: new Date(item.date),
                        players: this.objectToArray(item.players),
                    }
                })
                this.setState({
                    matches
                })
            })
            .catch(err => {
                console.log(err);
            })
        
        window.addEventListener('resize', this.logWindowSize);
    }

    componentDidUpdate() {
        console.count('update times')
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.logWindowSize)
    }

    logWindowSize = () => {
        console.log(window.innerWidth);
        this.setState({ windowSize: window.innerWidth })
    }

    objectToArray = object => {
        const array = [];

        for(let key in object) {
            array.push({ id: key, ...object[key]})
        }

        return array;
    }

    joinMatchHandler = id => {
        console.log(id)
    }

    optOutMatchHandler = id => {
        console.log(id)
    }

    render() {
        console.count('render times')
        return (
            <div>
                { this.state.matches.map((item, index) => {
                    return (
                        <MatchCard 
                            key={ item.id } 
                            { ...item }
                            onTitleClick={ this.removeMatchHandler }
                            onJoinMatch={ this.joinMatchHandler } 
                            onOptOutMatch={ this.optOutMatchHandler }
                            declination={ index % 2 ? 'Left' : 'Right' }
                        />
                    )
                }) }
                
            </div>
        )
    }
}

export default Home;