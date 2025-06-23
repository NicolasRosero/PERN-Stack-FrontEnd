import { Button, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TaskList() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  // Función para consultar las tareas
  const getTasks = async () => {
    const resp = await fetch(
      'http://localhost:4000/tasks',
      {
        method: 'GET',
      }
    );
    const data = await resp.json();
    setTasks(data);
  };

  const editTask = (id) => {
    navigate(`/tasks/${id}/edit`);
  };

  const deleteTask = async (id) => {
    try {
      await fetch(
        `http://localhost:4000/tasks/${id}`,
        {
          method: 'DELETE'
        }
      );

      setTasks(tasks.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Ha ocurrido un error al eliminar la tarea: ', error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <h1>Task List</h1>
      {
        tasks.map((item) => (
          <Card style={styles.card} key={item.id}>
            <CardContent style={styles.cardContent}>
              {/* Sección de la info de las tareas */}
              <div>
                  <Typography>
                  { item.title }
                </Typography>

                <Typography>
                  { item.description }
                </Typography>
              </div>
              {/* End Sección de la info de las tareas */}

              {/* Sección de botones */}
              <div>
                <Button
                  variant="contained"
                  color="info"
                  style={styles.btn}
                  onClick={() => editTask(item.id)}
                >
                  Edit
                </Button>

                <Button
                  variant="contained"
                  color="warning"
                  style={styles.btn}
                  onClick={() => deleteTask(item.id)}
                >
                  Delete
                </Button>
              </div>
              {/* End Sección de botones */}
            </CardContent>
          </Card>
        ))
      }
    </>
  )
}

const styles = {
  card: {
    marginBottom: '.7rem',
    backgroundColor: '#1E272E',
    color: '#FFF'
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  btn: {
    marginLeft: '.5rem',
    marginRight: '.5rem'
  }
};
