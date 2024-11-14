import React from 'react'
import service from '../service/config'
import { Link } from 'react-router-dom'

export default function PostCard($id,title,image) {
  return (
    <div>
      <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-300 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={service.getImgPreview(image)} alt={title} className='rounded-xl' />
            </div>
            <h2 className='text-lg font-bold'>{title}</h2>
        </div>
      </Link>
    </div>
  )
}
