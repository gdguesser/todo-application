import { Box } from "@mantine/core"
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

  return <Box>{JSON.stringify(data)}
  
  
  <AddTodo mutate={mutate} />
  </Box>
}

export default App
