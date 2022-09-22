import { Box, List, Anchor, ActionIcon } from "@mantine/core"
import { useState } from 'react'
import { IconCircleCheck, IconCircleDashed, IconX } from '@tabler/icons';
import useSWR from "swr"
import './App.css'
import AddTodo from './components/AddTodo'

export interface Todo {
  id: number;
  title: string;
  body: string;
  done: boolean;
}

export const ENDPOINT = 'http://localhost:4000'

const fetcher = (url: string) => 
  fetch(`${ENDPOINT}/${url}`).then((r) => r.json());

function App() {

  const {data, mutate} = useSWR<Todo[]>('api/todos', fetcher);
  const [open, setOpen] = useState(false)

  async function markTodoAsDone(id: number) {
    const updated = await fetch(`${ENDPOINT}/api/todos/${id}/done`, {
      method: "PATCH"
    }).then((r) => r.json());

    mutate(updated);
  }

  async function getTodo(id: number) {
    await fetch(`${ENDPOINT}/api/todos/${id}`, {
      method: "GET"
    }).then((r) => r.json());
  }

  async function deleteTodo(id: number) {
    const updated = await fetch(`${ENDPOINT}/api/todos/${id}/delete`, {
      method: "DELETE"
    }).then((r) => r.json());

    mutate(updated);
  }

  return <Box
    sx={(theme) => ({
      padding: "2rem",
      width: "100%",
      maxWidth: "40rem",
      margin: "0 auto",
      textAlign: "start",
    })}
  >
    <List spacing="xs" size="sm" mb={12} center>
      {data?.map((todo) => {
        return <List.Item
          key={`todo_list__${todo.id}`}
          icon={
            todo.done ? (<ActionIcon 
                            variant="transparent"
                            onClick={() => markTodoAsDone(todo.id)} 
                            color="teal" 
                            size="lg" 
                            radius="xl">
              <IconCircleCheck size={20}/>
            </ActionIcon>
          ) : (
            <ActionIcon 
              variant="transparent"
              onClick={() => markTodoAsDone(todo.id)} 
              size="lg" 
              radius="xl">
              <IconCircleDashed size={20}/>
            </ActionIcon>)
          }
        >
          <Anchor onClick={() => getTodo(todo.id)}>
            {todo.title}
          </Anchor>
          <ActionIcon 
              variant="transparent"
              onClick={() => deleteTodo(todo.id)} 
              size="lg" 
              radius="xl">
              <IconX size={20}/>
            </ActionIcon>
        </List.Item>
      })}
    </List>
  
  <AddTodo mutate={mutate} />
  </Box>
}

export default App
