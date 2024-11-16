import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'
import { IconButton, Button, Box } from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'
import { toast } from 'react-toastify'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'

const DataTable = () => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/contacts')

      if (!response.ok) throw new Error('Failed to fetch contacts')
      const data = await response.json()
      //console.log(data)
      setContacts(data.data || [])
      setLoading(false)
    } catch (error) {
      console.error('Error fetching contacts:', error)
    }
  }

  const handleDelete = async id => {
    try {
      const response = await fetch(`http://localhost:5000/api/contacts/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete contact')
      }
      setContacts(contacts.filter(contact => contact.id !== id))
      toast.success('Contact deleted successfully!')
    } catch (error) {
      console.error('Error deleting contact:', error)
      toast.error('Error deleting contact: ' + error.message)
    }
  }

  const columns = [
    { field: 'first_name', headerName: 'First Name', width: 150 },
    { field: 'last_name', headerName: 'Last Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone_number', headerName: 'Phone Number', width: 150 },
    { field: 'company', headerName: 'Company', width: 150 },
    { field: 'job_title', headerName: 'Job Title', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: true,
      renderCell: params => (
        <Box>
          <IconButton
            color='primary'
            onClick={() => navigate(`/edit/${params.row.id}`)}
          >
            <Edit />
          </IconButton>
          <IconButton
            color='secondary'
            onClick={() => handleDelete(params.row.id)}
          >
            <Delete />
          </IconButton>
        </Box>
      )
    }
  ]

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      {loading ? (
        <Stack spacing={2}>
          <Skeleton variant='rectangular' width='90%' height={50} />
          <Skeleton variant='rectangular' width='90%' height={50} />
          <Skeleton variant='rectangular' width='90%' height={50} />
        </Stack>
      ) : (
        <DataGrid
          rows={contacts}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          disableSelectionOnClick
        />
      )}
      <Button
        variant='contained'
        color='primary'
        onClick={() => navigate('/create')}
        sx={{ mt: 2 }}
      >
        Add New Contact
      </Button>
    </Box>
  )
}

export default DataTable
