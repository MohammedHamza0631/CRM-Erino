import React, { useState, useEffect } from 'react'
import { TextField, Button, Container, Typography, Box } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const Contact = ({ onSubmit }) => {
  const [contact, setContact] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    company: '',
    job_title: ''
  })

  const navigate = useNavigate()
  const { id } = useParams()
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/contacts/${id}`)
        .then(response => response.json())
        .then(data => setContact(data))
        .catch(error => console.error('Error fetching contact:', error))
    }
  }, [id])

  const handleChange = e => {
    const { name, value } = e.target
    setContact(prevContact => ({
      ...prevContact,
      [name]: value
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await onSubmit(contact)
    } catch (error) {
      toast.error('Error submitting form: ' + error.message)
    }
  }
  return (
    <Container>
      <Typography variant='h4' component='h1' gutterBottom>
        {id ? 'Edit Contact' : 'Add New Contact'}
      </Typography>
      <Box component='form' onSubmit={handleSubmit} noValidate>
        <TextField
          label='First Name'
          name='first_name'
          value={contact.first_name}
          onChange={handleChange}
          fullWidth
          margin='normal'
          required
        />
        <TextField
          label='Last Name'
          name='last_name'
          value={contact.last_name}
          onChange={handleChange}
          fullWidth
          margin='normal'
          required
        />
        <TextField
          label='Email'
          name='email'
          type='email'
          value={contact.email}
          onChange={handleChange}
          fullWidth
          margin='normal'
          required
        />
        <TextField
          label='Phone Number'
          name='phone_number'
          value={contact.phone_number}
          onChange={handleChange}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Company'
          name='company'
          value={contact.company}
          onChange={handleChange}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Job Title'
          name='job_title'
          value={contact.job_title}
          onChange={handleChange}
          fullWidth
          margin='normal'
        />
        <Button
          variant='contained'
          color='primary'
          type='submit'
          sx={{ mt: 2 }}
        >
          {id ? 'Update Contact' : 'Add Contact'}
        </Button>
      </Box>
    </Container>
  )
}

export default Contact
