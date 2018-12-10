import React, { Component } from 'react';
import MatchCard from '../components/matches/MatchCard';

class Home extends Component {

    state = {
        title: 'HOME',
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

    removeMatchHandler = (id) => {
        console.log(id)

        const updatedMatches = this.state.matches.filter(item => {
            return item.id !== id
        });

        this.setState({
            matches: updatedMatches
        })
    }

    render() {
        return (
            <div>
                <h1>{this.state.title}</h1>
                { this.state.matches.map((item) => {
                    return (
                        <MatchCard 
                            key={ item.id } 
                            { ...item }
                            onTitleClick={ this.removeMatchHandler }
                            // title={ item.title }
                            // date={ item.date }
                            // players={ item.players }
                        />
                    )
                }) }
                
            </div>
        )
    }
}

export default Home;