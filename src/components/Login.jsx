import React from 'react'
import Input from './Input'
import Button from './Button'
import { useAuth } from '../context/AuthContext'
import Google from '../assets/google.svg'

export default function Login(){
    const { loginWithGoogle, login, email, password, setEmail, setPassword } = useAuth();

    return (
        <>
            <form>
                <Input 
                  placeholder="Email" 
                  type="email" 
                  name="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <Input 
                  placeholder="Password" 
                  type="password" 
                  name="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                /> 
                <Button
                  type="button"
                  bg="bg-indigo-600"
                  bgHover="bg-indigo-700"
                  onClick={login}
                >
                  <p className='font-bold text-white'>Log In</p>
                </Button>
            </form>

            {/* Login with Google */}
            <Button
                onClick={loginWithGoogle}
                type="button"
                bg="bg-white"
                bgHover="bg-gray-50"
            >
              <div className='flex gap gap-4 justify-center'>
                <img src={Google} alt="React Logo" />
                <p className='font-bold'>Login With Google</p>
              </div>
            </Button>
        </>
    )
}
