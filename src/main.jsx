import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import AllPosts from './pages/AllPost.jsx'
import AddPost from './pages/AddPost.jsx'
import Post from './pages/Post.jsx'
import EditPost from './pages/EditPost.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />} children={[
        <Route path="/" element={<Home />} />,
        <Route path='/login' element={<ProtectedRoute authenticated={false}><Login /></ProtectedRoute>} />,          
        <Route path='/signup' element={<ProtectedRoute authenticated={false}><Register /></ProtectedRoute>} />,
        <Route path='/allposts' element={<ProtectedRoute authenticated={true}><AllPosts /></ProtectedRoute>} />,
        <Route path='/createpost' element={<ProtectedRoute authenticated={true}><AddPost /></ProtectedRoute>} />,
        <Route path='/post/:slug' element={<ProtectedRoute authenticated={true}><Post /></ProtectedRoute>} />,
        <Route path='/editpost/:slug' element={<ProtectedRoute authenticated={true}><EditPost /></ProtectedRoute>} />,
        
      ]} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
