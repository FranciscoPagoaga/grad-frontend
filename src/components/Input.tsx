import React, { ChangeEvent } from 'react'


interface InputProps {
    label: string;
    type: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({label, type, value, onChange} : InputProps) => {
  return (
    <div className='flex flex-col mb-4'>
        <label className="mb-2 text-sm font-medium text-gray-700">
            {label}
        </label>
        <input className='w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none foucs:ring-blue-500 focus:border-blue-500' type={type} value={value} onChange={onChange}/>
    </div>
  )
}

export default Input