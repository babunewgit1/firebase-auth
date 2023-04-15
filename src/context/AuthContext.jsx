import React, { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
export const UserContext = createContext();
const AuthContext = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const auth = getAuth(app);
  const signUpWithMail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginWithMail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (name) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };

  const sendingMail = () => {
    return sendEmailVerification(auth.currentUser);
  };

  const resetPass = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authContent = {
    user,
    signUpWithMail,
    loginWithMail,
    logOut,
    loading,
    updateUser,
    sendingMail,
    resetPass,
  };

  return (
    <UserContext.Provider value={authContent}>{children}</UserContext.Provider>
  );
};

export default AuthContext;
