const initialState = {
    isAuthenticated: false
}

const reducer = (state = initialState, action) => {
    console.log(action.type)
    switch(action.type) {
        case 'SIGNUP': 
            console.log(action.data)
            return {
                ...state,
                isAuthenticated: true
            }
        default: 
            return state;
    }
}

export default reducer;