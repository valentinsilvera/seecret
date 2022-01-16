import React, { useReducer, createContext } from 'react';

if (localStorage.getItem('jwtToken')) {
}

const AuthContext = createContext({
    user: null,
    login: (userData) => {},
    logout: () => {},
});

function authReducer(state, action) {
    switch (action.type) {
        case 'LOGOUT':
            return {
                ...state,
                user: null,
            };
        case 'LOGIN':
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
}

function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, { user: null });

    function login(userData) {
        localStorage.setItem('jwtToken', userData.token);
        dispatch({
            type: 'LOGIN',
            payload: userData,
        });
    }

    function logout() {
        localStorage.removeItem('jwtToken');
        dispatch({
            type: 'LOGOUT',
        });
    }

    return (
        <AuthContext.Provider
            value={{ user: state.user, login, logout }}
            {...props}
        />
    );
}

export { AuthContext, AuthProvider };
