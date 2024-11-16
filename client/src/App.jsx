import { useState } from 'react'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Contact from './pages/Contact'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App () {
  const navigate = useNavigate()

  const createOrUpdateContact = async contact => {
    try {
      const method = contact.id ? 'PUT' : 'POST'
      const url = contact.id
        ? `http://localhost:5000/api/contacts/${contact.id}`
        : 'http://localhost:5000/api/contacts'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to save contact')
      }
      toast.success('Contact saved successfully!')
      navigate('/')
    } catch (error) {
      console.error('Error:', error)
      toast.error(error.message || 'An unexpected error occurred')
    }
  }

  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route
            path='/create'
            element={<Contact onSubmit={createOrUpdateContact} />}
          />
          <Route
            path='/edit/:id'
            element={<Contact onSubmit={createOrUpdateContact} />}
          />
        </Routes>
      </main>
      <ToastContainer />
    </div>
  )
}

export default App
