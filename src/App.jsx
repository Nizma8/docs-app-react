
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Add from './Components/Add'
import Edit from './Components/Edit'
import { database } from './configure/firebase'

function App() {

  return (
    <>
    
   <Routes>
     <Route path='/' element={<Add database={database}/>}/> 
     <Route path='/edit/:id' element={<Edit database={database}/> }/> 
   </Routes>
    </>
  )
}

export default App
