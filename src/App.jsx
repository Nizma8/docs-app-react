
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Add from './Components/Add'
import Edit from './Components/Edit'
import { database } from './configure/firebase'
import Auth from './Components/Auth'

function App() {

  return (
    <>
    
   <Routes>
   <Route path='/register' element={<Auth register />}/>
   <Route path='/login' element={<Auth />}/>
 <Route path='/' element={<Add database={database}/>}/> 
     <Route path='/edit/:id' element={<Edit database={database}/> }/> 
   </Routes>
    </>
  )
}

export default App
