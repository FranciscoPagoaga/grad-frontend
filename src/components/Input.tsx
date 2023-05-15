import React, { ChangeEvent } from 'react'
import { useForm } from "react-hook-form";
import { UserInput } from '../network/users_api';
import { RegisterOptions, UseFormRegister } from 'react-hook-form'


interface InputProps  {
    label: string;
    type: string;
    placeholder?: string;
    name: string;
    register: UseFormRegister<any>;
    options?: RegisterOptions;
    value?: string
}

const Input = ({label, type, placeholder, register, name, options = {}, value } : InputProps) => {
  return (
    <div className='flex flex-col'>
        <label className="mb-2 text-sm font-medium text-gray-700">
            {label}
        </label>
        <input value={value} className='w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none foucs:ring-blue-500 focus:border-blue-500' type={type} placeholder={placeholder} {...register(name, options)} />
    </div>
  )
}

export default Input