import axios from 'axios';
import * as actionTypes from './actionTypes';
import fireStoreInstance from '../axios';

const axiosInstance = axios.create({
    baseURL: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/'
});

const API_KEY = 'AIzaSyDLOMUeyke0v8TFh6p_5M_ngQIaIu_IWSE';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId, username) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        tokenId: token,
        userId: userId,
        username: username
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const signup = (email, password, username) => {
    return dispatch => {
        dispatch(authStart());
        axiosInstance.post('signupNewUser?key=' + API_KEY, {
            email,
            password,
            returnSecureToken: true
        })
            .then( response => {
                dispatch(saveUserData(response.data.idToken, response.data.localId, username));
                console.log(response.data)
            })
            .catch(err => {
                console.log(err.response.data.error)
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
            .then( response => {
                dispatch(getUserData(response.data.idToken, response.data.localId));
                console.log(response.data)
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            })
    }
}

export const saveUserData = (tokenId, userId, username) => {
    return dispatch => {
        dispatch(authStart());
        const data = {
            fields: {
                Username: {
                    stringValue: username
                }
            }
        }
        fireStoreInstance.post('documents/users?documentId=' + userId, data)
            .then(response => {
                dispatch(authSuccess(tokenId, userId, username));
            })
            .catch(err => {
                console.log(err.response.data.error)
                dispatch(authFail(err.response.data.error));
            });
    }
}

export const getUserData = (tokenId, userId) => {
    return dispatch => { 
        fireStoreInstance.get('documents/users/' + userId)
            .then(response => {
                const username = response.data.fields.Username.stringValue;
                dispatch(authSuccess(tokenId, userId, username));
            })
            .catch(err => {
                console.log(err.response.data.error)
                dispatch(authFail(err.response.data.error));
            });
    }
}
