import FrontPage from './Components/FrontPage'
import './App.css'

function App() {

  return (
    <element>
      <h1>Movies To See</h1>
      <Routes>
        <Route path="/" element = { <FrontPage /> }/>
      </Routes>
    </element>
  )
}

export default App
