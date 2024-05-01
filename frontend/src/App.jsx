import FrontPage from './Components/FrontPage'
import { Route, Routes } from 'react-router-dom'
import Layout from './Components/Layout'
import './App.css'

function App() {

  return (
   <>
   
   <Layout>
      <Routes>
        <Route path="/" element = { <FrontPage /> }/>

      </Routes>
      </Layout>
      </>
    
  )
}

export default App
