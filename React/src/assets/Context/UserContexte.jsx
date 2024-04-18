

import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import PropTypes from 'prop-types';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const token = localStorage.getItem('token');


    useEffect(() => {

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUser(decodedToken);
            } catch (error) {
                localStorage.removeItem('token');
            }
        }
    }, [token]);

    const isAdmin = () => {
        return user && user.role == 2;
    };

    return (
        <UserContext.Provider value={{ user, isAdmin }}>
            {children}
        </UserContext.Provider>
    );
}

UserProvider.propTypes = {
    children: PropTypes.node,
};

export default UserContext;