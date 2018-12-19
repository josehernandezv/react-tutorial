import React, { Component } from 'react';
import MatchCard from '../components/matches/MatchCard';

class Home extends Component {

    state = {
        matches: [
            {
                id: 123,
                title: 'Primer mejenga',
                date: new Date(),
                players: [
                    { name: 'Jose '},
                    { name: 'Andres' },
                ]
            },
            {
                id: 456,
                title: 'Segunda mejenga',
                date: new Date(),
                players: []
            }
        ]
    }

    joinMatchHandler = id => {
        console.log(id)
    }

    optOutMatchHandler = id => {
        console.log(id)
    }

    render() {
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