// import React from 'react'
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='sticky' color='transparent'>
        <Container>
          <Toolbar>
            <Typography variant='h6' sx={{ flexGrow: 1 }}>
              <Link to='/' style={styles.linkToHome}>PERN Stack</Link>
            </Typography>

            <Button
              variant='contained'
              color='primary'
              onClick={() => navigate('/tasks/new')}
            >
              New Task
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

const styles = {
  linkToHome: {
    textDecoration: 'none',
    color: '#EEE'
  }
};
