import React from 'react'
import{Container , Logo , LogoutBtn} from '../index.js'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
export default function Header() {
  const authStatus = useSelector((state)=>state.auth.isAuthenticated)
  const navigate = useNavigate()
  const navItems=[
    {
    name:'Home',
    path:'/',
    active:true
    },
    {
      name:'Login',
      path:'/Login',
      active:!authStatus
    },
    {
      name:'Signup',
      path:'/Signup',
      active:!authStatus
    },
    {
      name:'All Posts',
      path:'/AllPosts',
      active:authStatus
    },
    {
      name:'Create Post',
      path:'/CreatePost',
      active:authStatus
    },
  ]
  return (
    <header className='py-4 shadow bg-gray-600'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo />
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {
              navItems.map((item)=>(
                item.active ? (
                  <li key={item.name}>
                    <button onClick={()=>navigate(item.path)} className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>{item.name}</button>
                  </li>
                ) : null
              ))
            }
            {
              authStatus ? (
                <li>
                  <LogoutBtn />
                </li>
              ) : null
            }
          </ul>
        </nav>
      </Container>
    </header>
  )
}
