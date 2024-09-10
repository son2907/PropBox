import './App.css'
import { Slider } from '@mui/material'

function App() {

  return (
    <>
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    <Slider defaultValue={30} />
    <Slider defaultValue={30} className="text-teal-600" />
    </>
  )
}

export default App
