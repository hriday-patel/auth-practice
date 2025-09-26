import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Router} from 'react-router-dom'
import Auth from './Auth'
import LoggedIn, { jobLoader } from './LoggedIn'

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route element={<Auth />} path='/'/>
    <Route element={<LoggedIn />} path='/loggedin/:id' loader={jobLoader}/>
    </>
  ))

 return (
    <RouterProvider router={router} />
 )
}

export default App
