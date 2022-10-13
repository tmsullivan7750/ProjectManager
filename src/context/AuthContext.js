import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, methods } from '../firebase'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    
    const [currentUser, setCurrentUser] = useState()
    const [loading,setLoading] = useState(true)
    
    function login(email,password){
        return methods.signInWithEmailAndPassword(auth,email,password)
    }

    function logout() {
        return methods.signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = methods.onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {currentUser, login, logout}

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>      
    )
}