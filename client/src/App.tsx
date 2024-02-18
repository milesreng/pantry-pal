import React from 'react'
import { Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'

import Layout from './pages/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Explore from './pages/Explore'
import CreateRecipe from './pages/CreateRecipe'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/explore' element={<Explore />} />
      <Route path='/create-recipe' element= {<CreateRecipe />} />
    </Route>
  )
)

const App = () => {

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
