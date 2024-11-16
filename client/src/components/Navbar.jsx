import React from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button
} from '@mui/material'
import PhoneIcon from '@mui/icons-material/Phone'
import { useNavigate } from 'react-router-dom'

function Navbar () {
  const navigate = useNavigate()

  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton edge='start' size='large' color='inherit' aria-label='logo'>
          <PhoneIcon />
        </IconButton>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          CMS
        </Typography>
        <Stack direction='row' spacing={2}>
          <Button color='inherit' onClick={() => navigate('/')}>
            Home
          </Button>
          <Button color='inherit' onClick={() => navigate('/create')}>
            Create
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
