import * as actionTypes from '../actions/actionTypes';

const initialState = {
    idToken: null,
    localId: null,
    isLoading: false,
    error: null
}

const authSuccess = (state, action) => {
    return {
        ...state,
        idToken: action.idToken,
        localId: action.localId,
        isLoading: false,
        error: null
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: return { ...state, isLoading: true }
        case actionTypes.AUTH_FAIL: return { ...state, isLoading: false, error: action.error }
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_LOGOUT: return { ...state, ...initialState }
        default: return state;
    }
}

export default reducer;