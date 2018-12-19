import React from 'react';
import styles from './MatchCard.module.css';
import moment from 'moment';
import Button from '../../ui/Button';
import PropTypes from 'prop-types';

const MatchCard = (props) => {
    const rotation = props.declination === 'Right' ? '6deg' : '-6deg';
    return (
        <div className={ styles.wrapper }>
            <div className={ styles.card } style={{ transform: `rotate(${ rotation })`, backgroundColor: getBgColor() }} >
                <h2>{ props.title}</h2>
                <span>{ moment(props.date).format('DD/MM/YYYY') }</span>
                <ol>
                    { props.players.map((player, index) => (
                        <li key={ index }>{ player.name }</li>
                    )) }
                </ol>
                <Button
                    float="right"
                    variant="success"
                >
                    Apuntarse
                </Button>
            </div>
        </div>
    )
}

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

MatchCard.propTypes = {
    title: PropTypes.string.isRequired,
    players: PropTypes.array,
    onJoinMatch: PropTypes.func.isRequired,
    onOptOutMatch: PropTypes.func.isRequired,
    declination: PropTypes.oneOf(['Right', 'Left'])
}

MatchCard.defaultProps = {
    players: [],
    declination: 'Right'
}

export default MatchCard;