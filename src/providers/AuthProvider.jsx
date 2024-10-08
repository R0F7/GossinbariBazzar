import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { app } from "../firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    //signin with google
    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    // const onAuthStateChange 
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log(currentUser);
            
            setLoading(false);
        })

        return () => unSubscribe();
    }, [])

    const authInfo = {
        user,
        loading,
        setLoading,
        signInWithGoogle,
    };

    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
    children: PropTypes.node,
}

export default AuthProvider
