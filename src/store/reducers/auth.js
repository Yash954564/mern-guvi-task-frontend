import { LOGIN, LOGOUT } from '../actionTypes';
import jwtDecode from 'jwt-decode';

const initialState = {
    user: null,
    token: null,
};

// Save state in localstorage, to be at same page if user reloads any page
if (localStorage.getItem('makeStoriesToken')) {
    const decodedToken = jwtDecode(localStorage.getItem('makeStoriesToken'));

    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('makeStoriesToken');
    } else {
        initialState.user = decodedToken;
        initialState.token = localStorage.getItem('makeStoriesToken');
    }
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
            };

        case LOGOUT:
            return {
                ...state,
                token: null,
                user: null,
            };

        default:
            return state;
    }
};

export default authReducer;
