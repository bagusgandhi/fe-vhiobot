import React from 'react'
import { useAuth } from '../context/AuthContext'
import Input from './Input'
import Button from './Button'

export default function Register(){
    const { register, setName, name, setEmail, email, setPassword, password } = useAuth();

    return (
        <form>
            <Input 
                placeholder="Display Name" 
                type="text" 
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <Input 
                placeholder="Email" 
                type="email" 
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <Input 
                placeholder="Password" 
                type="password" 
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <Button
                type="button"
                bg="bg-indigo-600"
                bgHover="bg-indigo-700"
                onClick={register}
            >
                <p className='font-bold text-white'>Register</p>
            </Button>
        </form>
    )
}
