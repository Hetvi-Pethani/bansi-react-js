import { BrowserRouter, Routes, Route } from "react-router-dom"
import Table from "./Pages/Table"
import Edit from "./Pages/Edit"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Table />} />
        <Route path="/edit" element={<Edit />} />

      </Routes>
    </BrowserRouter>

  )
}

export default App
