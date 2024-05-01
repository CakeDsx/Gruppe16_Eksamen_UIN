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
        <Route path="/movies/:slug" element = { <Home /> }/>
      </Routes>
      </Layout>
      </>
  )
}

export default App