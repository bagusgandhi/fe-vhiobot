import React from 'react'

export default function Button({ type, children, bg, bgHover, onClick }){
    return ( 
        <button
            type={type}
            className={`rounded-xl w-full ${bg} hover:${bgHover} p-4 text-sm shadow-md hover:shadow-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 mt-4`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}