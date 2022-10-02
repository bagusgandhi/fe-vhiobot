import React, { 
  createContext, 
  useState, 
  useEffect, 
  useContext } from 'react'
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile } from 'firebase/auth'
import { authentication } from '../config/firebase-config'

const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthContextProvider({ children }) {
    const [auth, setAuth] = useState(false || window.localStorage.getItem('auth') === 'true');
    const [token, setToken] = useState('' || window.localStorage.getItem('vhibtx_tken'));
    const [tabs] = useState(['Login', 'Register']);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [idUser, setIdUser] = useState('');

    useEffect(() => {
        onAuthStateChanged(authentication, (cred) => {
          if(cred){
            setAuth(true);
            window.localStorage.setItem('auth', 'true');
            window.localStorage.setItem('name', authentication.currentUser.displayName);
            cred.getIdToken().then((token) => {
              setToken(token);
              setIdUser(authentication.currentUser.uid)
              window.localStorage.setItem('vhibtx_tken', token);
            });
          }
        })
      });

    const loginWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(authentication, provider)
        .then((cred) => {
          if(cred){
            setAuth(true);
            window.localStorage.setItem('auth', 'true');
            }
        });
    };

    const login = () => {
      signInWithEmailAndPassword(authentication, email, password)
      .then((cred) => {
        if(cred){
          setAuth(true);
          window.localStorage.setItem('auth', 'true');
        }
      }).catch((err) => (
        alert(err.message)
      ));
    }
    
    const register = () => {
      if (!name) alert("Please enter name");
      createUserWithEmailAndPassword(authentication, email, password)
      .then((cred) => {
        if(cred){
          setAuth(true);
          window.localStorage.setItem('auth', 'true');
          updateProfile(authentication.currentUser, name)
          }
      }).catch((err) => (
        alert(err.message)
      ));
    }

    const value = {
        auth,
        token,
        loginWithGoogle,
        tabs,
        login,
        register,
        setName,
        name,
        setEmail,
        email,
        setPassword,
        password,
        idUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
