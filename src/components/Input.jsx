import React, { forwardRef, useId } from 'react'


const Input = forwardRef(function Input({
    label,
    type='text',
    classname='',
    ...props
}, ref){

    const id = useId()

    return(
        <div className='w-full'>
            {
                label && <label htmlFor={id} className='inline-block mb-2 pl-1'>
                    {label}
                </label>
            }
            <input type={type} className={` px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-100 duration-200 border border-gray-300 w-full ${classname}`} ref={ref} {...props} id={id} />
        </div>
    )
})

export default Input
