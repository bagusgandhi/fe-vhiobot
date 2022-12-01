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
  updateProfile,
  signOut 
} from 'firebase/auth'
import toast, { Toaster } from 'react-hot-toast'
import { authentication, createUserDoc } from '../config/firebase-config'

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
        provider.setCustomParameters({
          prompt: "select_account"
        });

        toast.promise(
          signInWithPopup(authentication, provider),
          {
            loading: 'Proses Autentikasi...',
            success: (cred) => {
              if(cred){
                setAuth(true);
                window.localStorage.setItem('auth', 'true');
                window.localStorage.setItem('name', authentication.currentUser.displayName);
                createUserDoc(cred.user);
              }
              return 'Autentikasi Berhasil'
            },
            error: (err) => {
              console.log(err)
              if(err.code == "auth/user-not-found"){
                return 'User Belum Terdaftar!'
              }
  
              return 'Terjadi Kesalahan. Tunggu Beberapa saat lagi!'
            }
          }
        )
    };

    

    const login = () => {
      toast.promise(
        signInWithEmailAndPassword(authentication, email, password),
        {
          loading: 'Proses Autentikasi...',
          success: (cred) => {
            if(cred){
              setAuth(true);
              window.localStorage.setItem('auth', 'true');
              window.localStorage.setItem('name', authentication.currentUser.displayName);
            }

            return 'Autentikasi Berhasil'
          },
          error: (err) => {
            if(err.code == "auth/user-not-found"){
              return 'User Belum Terdaftar!'
            }
            
            if(err.code == "auth/invalid-email"){
              return 'Pastikan Email dan Password Valid'
            }

            return 'Terjadi Kesalahan. Tunggu Beberapa saat lagi!'
          }
        }
      );
    }

    const register = () => {
      if (!name) toast.error("Masukan Nama!");

      toast.promise(
        createUserWithEmailAndPassword(authentication, email, password),
        {
          loading: 'Proses Register...',
          success: (cred) => {
            if(cred){
              setAuth(true);
              window.localStorage.setItem('auth', 'true');
              window.localStorage.setItem('name', name);
              updateProfile(authentication.currentUser, { displayName: name});
              createUserDoc(cred.user, { displayName: name});
            }
            return 'Register Akun Berhasil'
          },
          error: (err) => {
            if(err.code == "auth/email-already-exists"){
              return 'Akun sudah Pernah Terdaftar, Silahkan Login!'
            }

            if(err.code == "auth/invalid-email"){
              return 'Pastikan Email dan Password Valid'
            }

            return 'Terjadi Kesalahan. Tunggu Beberapa saat lagi!'
          }
        }

      );
    }

    const handleLeaveChat = () => {
      window.localStorage.removeItem("auth")
      window.localStorage.removeItem('name');
      window.localStorage.removeItem('vhibtx_tken');
      window.localStorage.removeItem('chats');

      toast.promise(
        signOut(authentication),
        {
          loading: 'Proses Sign Out...',
          success: () => {
            return 'Sign Out Berhasil'
          },
          error: (err) => {
            return `Terjadi Kesalahan. Tunggu Beberapa saat lagi! ${err.message}`
          }
        }
      )

      window.location.reload()
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
        idUser,
        handleLeaveChat
    }

    return (
        <AuthContext.Provider value={value}>
            <Toaster />
            {children}
        </AuthContext.Provider>
    )
}
