import React from 'react';
import PropTypes from 'prop-types';
import styles from './MatchCard.module.css';
import moment from 'moment';
import Button from '../../ui/Button';

const matchCard = props => {
    const rotation = props.declination === 'Right' ? '6deg' :  '-6deg';
    
    return (
        <div className={ styles.wrapper }>
             <div className={ styles.card } style={{ transform: `rotate(${rotation})`, backgroundColor: getBgColor() }}>
                <h2>{ props.title }</h2>
                <span>{ moment(props.date).format('DD/MM/YYYY') }</span>
                <ol>
                    { props.players.map(player => (
                        <li key={ player.playerId }>{ player.playerName}</li>
                    ))}
                </ol>
                { props.showButton && (
                    <div>
                        <Button 
                            float="right" 
                            variant= { props.isInTheMatch ? 'danger' : 'success' }
                            onClick={ props.isInTheMatch ? props.onOptOutMatch : props.onJoinMatch  }>
                            { props.isInTheMatch ? 'Quitarse' : 'Apuntarse' }
                        </Button>
                    </div>
                )}
            </div>
        </div>
       
    );
};

const getBgColor = () => {
    const randomNumber = Math.floor((Math.random() * 4) + 1);
    switch (randomNumber) {
        case 1: return '#dcff46';
        case 2: return '#fffeaa';
        case 3: return '#ff7eb9';
        case 4: return '#7afcff';
        default: return '#fffeaa';
    }
}

matchCard.propTypes = {
    title: PropTypes.string.isRequired,
    players: PropTypes.array,
    onJoinMatch: PropTypes.func,
    onOptOutMatch: PropTypes.func,
    declination: PropTypes.oneOf(['Left', 'Right'])
};

matchCard.defaultProps = {
    declination: 'Right',
    players: []
}

export default matchCard;