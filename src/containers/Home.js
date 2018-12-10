import React, { Component } from 'react';
import { connect } from 'react-redux';
import MatchCard from '../components/matches/MatchCard';
import { fetchMatches, joinMatch, optOutMatch } from '../store/actions';

class Home extends Component {

    state = {
    }

    componentDidMount() {
        this.props.onFetchMatches();
    }

    // addParticipantHandler = matchId => {
    //     const newParticipantTest = { name: 'Carlos' }

    //     const updatedMatches = this.state.matches.map(item => {
    //         if (item.id === matchId) {
    //             return {
    //                 ...item,
    //                 participants: [...item.participants, newParticipantTest ]
    //             }
    //         }
    //         return item;
    //     });

    //     this.setState({ matches: updatedMatches });
    // }

    // removeParticipantHandler = matchId => {
    //     const updatedMatches = this.state.matches.map(item => {
    //         if (item.id === matchId) {
    //             return {
    //                 ...item,
    //                 participants: item.participants.filter(p => p.name !== 'Carlos')
    //             }
    //         }
    //         return item;
    //     });

    //     this.setState({ matches: updatedMatches });
    // }

    joinMatchHandler = (id) => {
        if (this.props.isAuthenticated) {
            this.props.onJoinMatch(id);
        }
    }

    optOutMatchHandler = (id) => {
        if (this.props.isAuthenticated) {
            this.props.onOptOutMatch(id);
        }
    }

    isUserInTheMatch = players => {
        const { userId } = this.props;
        if (players && userId) {
            for (let player of players) {
                console.log(players)
                if (player.playerId === userId) {
                    return true;
                }
            }
        }
        return false;
    }

    render() {
        const cards = this.props.matches.map((item, index) => (
            <MatchCard 
                key={ item.id }
                { ...item }
                onJoinMatch={ () => this.joinMatchHandler(item.id) }
                onOptOutMatch={ () => this.optOutMatchHandler(item.id) }
                declination={ index % 2 ? 'Left' : 'Right' }
                showButton={ this.props.isAuthenticated }
                isInTheMatch={ this.isUserInTheMatch(item.players) }
            />
        ));
        return (
            <div>
                { cards }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        matches: state.matches.matches,
        isAuthenticated: state.auth.tokenId !== null,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchMatches: () => dispatch(fetchMatches()),
        onJoinMatch: matchId => dispatch(joinMatch(matchId)),
        onOptOutMatch: matchId => dispatch(optOutMatch(matchId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);