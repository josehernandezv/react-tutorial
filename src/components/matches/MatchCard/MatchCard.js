import React from 'react'

const MatchCard = (props) => {
    return (
        <div>
            <h1 
                onClick={() => props.onTitleClick(props.id) }
            >
            {props.title}
            </h1>
        </div>
    )
}

export default MatchCard;