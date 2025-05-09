const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT = 'LOGOUT';

export const loginSuccess = (user) => {
    return {
        type: LOGIN_SUCCESS,
        user: user,
    }
}

export const logout = () => {
    return {
        type: LOGOUT,
    }
}

export const accountAction = (state = null, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            console.log(action.user)
            const accountString = JSON.stringify(action.user);
            localStorage.setItem('user', accountString);
            return action.user;
        case LOGOUT:
            localStorage.removeItem('user');
            return null;
        default:
            return state;
    }
}