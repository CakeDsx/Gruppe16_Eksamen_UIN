import FrontPage from './Components/FrontPage'
import { Route, Routes } from 'react-router-dom'
import Layout from './Components/Layout'
import Home from './Components/Home'
import NoPage from './Components/NoPage'
import GenrePage from './Components/GenrePage'
import './App.css'
import './Styling/Styling.scss'

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/FrontPage" element={<FrontPage />} />
          <Route path="/Home/:userId" element={<Home />} />
          <Route path="/Genres/:userId" element={<GenrePage />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
