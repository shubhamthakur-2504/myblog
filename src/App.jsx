import './App.css'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from './service/auth'
import { login,logout } from './store/authSlice'
import Loader from './components/loader/Loader'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { Outlet } from 'react-router-dom'
function App() {
  const [loding, setloding] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    authService.getCurrentUser().then((res) => {
      if (res) {
        dispatch(login({res}))
      }else{
        dispatch(logout())
      }
    }).catch((error) => {
      console.log('App :: useEffect :: error',error)
  }).finally(() => {
    setloding(false)
  })
  }, [])
  return !loding ? (
    <>
      <div className=" min-h-screen text-white content-between  bg-black">
        <div className="w-full flex-col flex flex-wrap justify-center items-center">
          <Header/>
          <main>
            <Outlet/>
          </main>
          <Footer/>
        </div>
        
      </div>
    </>
  ):(<Loader/>)
}

export default App
