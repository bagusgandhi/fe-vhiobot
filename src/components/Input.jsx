import React from 'react'

export default function Input({ ...otherProps }){
    return (
        <input 
            className="block rounded-xl bg-gray-50 w-full  p-4 shadow-sm focus:outline-none focus:border-sky-500 focus:outline-none focus:bg-gray-100 mb-2" 
            { ...otherProps }
            // placeholder={placeholder} 
            // type={type}
            // name={name} 
            // onChange={onChange}
            // value={value}
        />
    )
}