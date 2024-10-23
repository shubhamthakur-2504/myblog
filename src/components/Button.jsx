import React from 'react'

export default function Button({
    children,
    type='button',
    bgcolor='bg-blue-600',
    textcolor='text-white',
    classname='',
    ...props
}) {
  return (
    <button className={` ${bgcolor} ${textcolor} ${classname}`} type={type} {...props}>{children}</button>
  )
}
