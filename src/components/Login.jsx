import React from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {login as authLogin} from '../store/authSlice'
import { useDispatch } from 'react-redux'
import {Button, Input, Logo} from './index.js'
import authService from '../service/auth'
import { useForm } from 'react-hook-form'

export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState("")
    const {register, handleSubmit} = useForm()

    const login= async (data) =>{
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData)) 
                navigate("/")
            }
        } catch (error) {
            setError(error.message)    
        }
    }

  return (
    <div className='flex items-center justify-center w-full'>
      <div className='mx-auto w-full max-w-lg bg-gray-400 rounded-xl p-10 border border-black/10'>
        <div className='mb-2 flex justify-center'>
            <span className='inline-block w-full max-w-[100px]'>
                <Logo width="100%" />
            </span>
        </div>
        <h2 className='text-2xl font-bold text-center leading-tight'>Sign in to your account</h2>
        <p className='mt-2 text-center text-base text-black/60'>Don&apos;t have an account yet? &nbsp;
        <Link to={'/signup'} className='font-medium text-primary transition-all duration-200 hover:underline'>Sign Up</Link>
        </p>
        {error && <p className='text-red-500 mt-8 text-center'>{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-6'>
                <Input
                label="Email Address: " 
                type="email"
                placeholder="Enter your email"
                {...register('email', {required:true,validate: {matchPatten:(value) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Invalid email address'}})}
                />

                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register('password', {required:true , validate: {matchPatten:(value) =>/ ^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/.test(value) || 'Invalid password'}})}
                />

                <Button type="submit" className='w-full' children="Sign In"/>
            </div>
        </form>
      </div>
    </div>
  )
}
