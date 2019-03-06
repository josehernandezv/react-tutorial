import * as actionTypes from './actionTypes';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/'
})

const API_KEY = 'AIzaSyDLOMUeyke0v8TFh6p_5M_ngQIaIu_IWSE';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const authSuccess = (idToken, localId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken,
        localId
    }
}

export const signup = (data) => {
    return (dispatch) => {
        dispatch(authStart());
        axiosInstance.post('signupNewUser?key=' + API_KEY, data)
            .then(response => {
                console.log(response.data);
                dispatch(authSuccess(response.data.idToken, response.data.localId))
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error));
            })
    }
}

export const login = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        axiosInstance.post('verifyPassword?key=' + API_KEY, { 
            email,
            password,
            returnSecureToken: true
        })
            .then(response => {
                dispatch(authSuccess(response.data.idToken, response.data.localId))
            })
            .catch(err => {
                console.log(err)
                dispatch(authFail(err.response.data.error));
            })
    }
}