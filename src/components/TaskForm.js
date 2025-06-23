import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

export default function TaskForm() {
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [task, setTask] = useState({
    title: '',
    description: ''
  });

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
    
      if(editing) {
        await fetch(
          `http://localhost:4000/tasks/${params.id}`,
          {
            method: 'PUT',
            body: JSON.stringify(task),
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
      } else {
        await fetch(
          'http://localhost:4000/tasks',
          {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
      }

      setLoading(false);
      navigate('/');
    } catch (error) {
      setLoading(false);
      console.error('Ha ocurrido un error al crear o editar la tarea: ', error);
    }
  };

  const handleChange = async (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value
    });
  }

  const getTaskById = async (id) => {
    try {
      setLoading(true);
      setEditing(true);
      const resp = await fetch(`http://localhost:4000/tasks/${id}`);
      const data = await resp.json();

      setTask({
        title: data.title,
        description: data.description,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Ha ocurrido un error al consultar la tarea por el Id: ' + id, error);
    }
  };

  useEffect(() => {
    if(params.id) {
      getTaskById(params.id);
    }
  }, [params.id]);

  return (
    <Grid
      container
      alignItems='center'
      justifyContent='center'
      direction='column'
      sx={{ mt: 10 }}
    >
      <Grid item xs={3}>
        <Card
          sx={styles.card}
        >
          <Typography
            variant='h5'
            textAlign='center'
            color='white'
          >
            {
              editing
              ? 'Edit task'
              : 'Create task'
            }
          </Typography>

          <CardContent>
            <form onSubmit={handleSubmit}>
              {/* Campo del título de la tarea */}
              <TextField
                name='title'
                value={task.title}
                variant='filled'
                label='Write your title'
                sx={styles.basicInput}
                inputProps={{style: {...styles.inputProps}}}
                InputLabelProps={{style: {...styles.labelProps}}}
                onChange={handleChange}
              />
              {/* End Campo del título de la tarea */}

              {/* Campo del contenido de la tarea */}
              <TextField
                name='description'
                value={task.description}
                variant='filled'
                label='Write your task'
                multiline
                rows={4}
                sx={styles.basicInput}
                inputProps={{style: {...styles.inputProps}}}
                InputLabelProps={{style: {...styles.labelProps}}}
                onChange={handleChange}
              />
              {/* End Campo del contenido de la tarea */}

              <Button
                variant='contained'
                color='primary'
                type='submit'
                disabled={!task.title || !task.description || loading}
                sx={styles.btnSubmit}
              >
                {
                  loading
                  ? <CircularProgress color='inherit' size={24} />
                  : 'Save'
                }
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

const styles = {
  basicInput: {
    display: 'block',
    mx: 0,
    my: 1
  },
  inputProps: {
    color: '#FFF'
  },
  labelProps: {
    color: '#FFF'
  },
  card: {
    maring: 5,
    backgroundColor: '#1E272E',
    padding: '.5rem'
  },
  btnSubmit: {
    mt: 1
  }
};
