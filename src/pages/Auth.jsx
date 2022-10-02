import React from 'react'
import { Tab } from '@headlessui/react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'
import Login from '../components/Login'
import Register from '../components/Register'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Auth(){
  const { tabs, auth } = useAuth();


  return(
    auth ? <Navigate to='/' /> :
    <div className='w-full max-w-xl px-2 py-16 sm:px-0 mx-auto h-screen py-40'>
      <Tab.Group>
        <Tab.List className="flex space-x-4 rounded-xl p-1">
          { tabs.map((tab, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                classNames(
                  'w-full py-4 text-lg font-medium text-white rounded-xl',
                  'focus:outline-none',
                  selected
                    ? 'bg-white text-indigo-800'
                    : 'text-opacity-70'
                )
              }
            >
              { tab }
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-6">
          <Tab.Panel className="rounded-xl bg-white px-6 py-10 grid gap-4 grid-cols-1">
              <Login />
          </Tab.Panel>
          <Tab.Panel className="rounded-xl bg-white px-6 py-10 grid gap-4 grid-cols-1">
              <Register />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div> 
  )
}