import React, { forwardRef , useId } from 'react'

function Select({
    label,
    classname='',
    options=[],
    ...props
},ref) {
    const id = useId()
  return (
    <div className='w-full'>
      {label && <label htmlFor={id} className=''></label>}
      <select className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-100 duration-200 border border-gray-300 w-full ${classname}`} ref={ref} {...props} id={id}>
        {
            options?.map((option)=>(
                <option key={option} value={option}>{option}</option>
            ))
        }
      </select>
    </div>
  )
}

export default forwardRef(Select)
