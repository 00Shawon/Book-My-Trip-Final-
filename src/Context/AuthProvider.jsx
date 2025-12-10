import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../Firebase/firebase.init';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
const GoogleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
const [user, setUser]= useState(null)
const [loading, setLoading]= useState(true)

 const registerUser = (email,password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
 }

const signInUser = (email,password) => {
    setLoading(true)
   return signInWithEmailAndPassword(auth, email, password)
}

const SigninWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, GoogleProvider)
}


const logOut = () =>  {
    setLoading(true)
    return signOut(auth);
}

//update user profile
const updateUserProfile = (profile) => {
return updateProfile(auth.currentUser, profile)

}


// to observer user state 
useEffect(()=> {
const unSubscribe = onAuthStateChanged(auth,(currentUser)=> {
    setUser(currentUser);
    setLoading(false);
    console.log(currentUser)
})
return () => {
    unSubscribe()
}
},[])

    const authInfo = {
registerUser,
signInUser,
SigninWithGoogle,
user,
loading,
logOut,
updateUserProfile
    } 
    return (
       <AuthContext value={authInfo}>
{children}
       </AuthContext>
    );
};

export default AuthProvider;