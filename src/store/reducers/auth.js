import * as actionTypes from '../actions/actionTypes';

const initialState = {
    tokenId: null,
    userId: null,
    userData: null,
    error: null,
    isLoading: false
}

const authSuccess = (state, action) => {
    return {
        ...state,
        tokenId: action.tokenId,
        userId: action.userId,
        isLoading: false,
        userData: {
            username: action.username
        }
    }
}

const logout = (state, action) => {
    return {
        ...state,
        tokenId: null,
        userId: null,
        userData: null,
        error: null,
        isLoading: false
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: return { ...state, isLoading: true, error: null }
        case actionTypes.AUTH_FAIL: return { ...state, isLoading: false, error: action.error }
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
        case actionTypes.AUTH_LOGOUT: return logout(state, action)
        default: return state;
    }
}

export default reducer;