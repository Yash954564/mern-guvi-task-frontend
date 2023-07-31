import { LOGIN, LOGOUT } from '../actionTypes';

export const login = (user, token) => {
    localStorage.setItem('makeStoriesToken', token);
    return {
        type: LOGIN,
        payload: { user, token },
    };
};

export const logout = () => {
    localStorage.removeItem('makeStoriesToken');
    return {
        type: LOGOUT,
    };
};
