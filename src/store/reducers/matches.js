import * as actionTypes from '../actions/actionTypes';

const initialState = {
    matchCreated: false,
    error: null,
    isLoading: false,
    matches: [
        // {
        //     id: 123,
        //     title: 'Primer mejenga',
        //     date: new Date(),
        //     players: [
        //         { name: 'Jose '},
        //         { name: 'Andres' },
        //     ]
        // },
        // {
        //     id: 456,
        //     title: 'Segunda mejenga',
        //     date: new Date(),
        //     players: []
        // }
    ]
}

const addNewMatch = (state, action) => {
    return {
        ...state,
        isLoading: false,
        matchCreated: true,
        matches: [...state.matches, action.newMatch]
    }
}

const updateMatch = (state, action) => {
    const updatedMatches = state.matches.map(item => {
        if (item.id === action.match.id) {
            return { ...action.match };
        }
        return item;
    })
    return {
        ...state,
        matches: updatedMatches
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.CREATE_MATCH_INIT: return { ...state, error: null, loading: false, matchCreated: false };
        case actionTypes.CREATE_MATCH_SUCCESS: return addNewMatch(state, action);
        case actionTypes.UPDATE_MATCH: return updateMatch(state, action);
        case actionTypes.CREATE_MATCH_START: return { ...state, isLoading: true };
        case actionTypes.FIRESTORE_ERROR: return { ...state, error: action.error };
        case actionTypes.SET_MATCHES: return { ...state, matches: action.matches };

        default: return state;
    }
}

export default reducer;