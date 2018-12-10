import * as actionTypes from './actionTypes';
import fireStoreInstance from '../axios';
import qs from 'qs';
// import { qs } from 'axios';
import { getArrayFromDocuments, getObjectFromDocument, formatDocumentFromArray } from '../../utils/firestoreUtilities';

export const createMatchInit = () => {
    return {
        type: actionTypes.CREATE_MATCH_INIT
    };
};

export const createMatchStart = () => {
    return {
        type: actionTypes.CREATE_MATCH_START
    };
};

export const createMatchSuccess = newMatch => {
    return {
        type: actionTypes.CREATE_MATCH_SUCCESS,
        newMatch
    };
};

export const requestFail = error => {
    return {
        type: actionTypes.FIRESTORE_ERROR,
        error
    };
};

export const setMatches = matches => {
    return {
        type: actionTypes.SET_MATCHES,
        matches
    };
};

export const updateMatch = match => {
    return {
        type: actionTypes.UPDATE_MATCH,
        match
    };
};

export const createMatch = (title, date) => {
    return dispatch => {
        dispatch(createMatchStart());
        const data = {
            fields: {
                title: {
                    stringValue: title
                },
                date: {
                    timestampValue: date
                }
            }
        }
        fireStoreInstance.post('documents/matches', data)
            .then(response => {
                console.log(response.data)
                dispatch(createMatchSuccess(getObjectFromDocument(response.data)))
            })
            .catch(err => {
                console.log(err.response.data.error)
                dispatch(requestFail(err.response.data.error));
            });
    }
}

export const fetchMatches = () => {
    return dispatch => {
        fireStoreInstance.get('documents/matches/')
            .then(response => {
                console.log(response.data)
                dispatch(setMatches(getArrayFromDocuments(response.data.documents)))
            })
            .catch(err => {
                console.log(err.response.data.error)
            });
    }
}

export const joinMatch = matchId => {
    return (dispatch, getState) => {
        const match = getState().matches.matches.find(item => item.id === matchId);
        
        const players = match.players ? match.players : [];
        const updatedPlayers = [ ...players , {
            playerName: getState().auth.userData.username,
            playerId: getState().auth.userId,
        }];
        const formatedData = formatDocumentFromArray(updatedPlayers);

        const params = new URLSearchParams();
        params.append('currentDocument.exists', true)
        params.append('updateMask.fieldPaths', 'players')
        fireStoreInstance.patch(`documents/matches/${matchId}`, formatedData, {
            params: params,
        })
            .then(response => {
                dispatch(updateMatch(getObjectFromDocument(response.data)))
                console.log(response.data)
            })
            .catch(err => {
                console.log(err)
                console.log(err.response.data.error)
            });
    }
}

export const optOutMatch = matchId => {
    return (dispatch, getState) => {
        const match = getState().matches.matches.find(item => item.id === matchId);
        const userId = getState().auth.userId;
        
        const players = match.players ? match.players : [];
        const updatedPlayers = players.filter(item => item.playerId !== userId);
        
        const formatedData = updatedPlayers.length ? formatDocumentFromArray(updatedPlayers) : null;

        const params = new URLSearchParams();
        params.append('currentDocument.exists', true)
        params.append('updateMask.fieldPaths', 'players')
        fireStoreInstance.patch(`documents/matches/${matchId}`, formatedData, {
            params: params,
        })
            .then(response => {
                dispatch(updateMatch(getObjectFromDocument(response.data)))
                console.log(response.data)
            })
            .catch(err => {
                console.log(err)
                console.log(err.response.data.error)
            });
    }
}

// 'Authorization': `Bearer ${YOUR_TOKEN}`
