import * as actionTypes from './actionTypes';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/'
})

const API_KEY = 'AIzaSyDLOMUeyke0v8TFh6p_5M_ngQIaIu_IWSE';

export const signupStart = () => {
    return {
        type: actionTypes.SIGNUP_START,
    }
}

export const signupFail = (error) => {
    return {
        type: actionTypes.SIGNUP_FAIL,
        error
    }
}

export const signupSuccess = (tokenId, userId) => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
        tokenId,
        userId
    }
}

export const signup = (data) => {
    return (dispatch) => {
        dispatch(signupStart());
        axiosInstance.post('signupNewUser?key=' + API_KEY, data)
            .then(response => {
                console.log(response.data);
                dispatch(signupSuccess(response.data.idToken, response.data.localId))
            })
            .catch(err => {
                console.log(err);
                dispatch(signupFail(err.response.data.error));
            })
    }
}