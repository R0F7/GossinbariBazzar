import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types'
import {
    GoogleAuthProvider,
    getAuth,
    onAuthStateChanged,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';
import { app } from "../firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    //sign in with google
    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    //create user with email and password
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //sign in with email and password
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
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
        createUser,
    };

    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
    children: PropTypes.node,
}

export default AuthProvider