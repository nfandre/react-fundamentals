import './App.css'
import Fruta from './Components/Fruta'
import Pirata from './Components/Pirata'
import Recompensa from './Components/Recompensa'

function App() {
  return (
    <>
      <Pirata nome="Chopper" cargo="Médico" imagem="https://i.pinimg.com/564x/ec/5b/57/ec5b57209323835ff8513238a48811eb.jpg" />

      <Recompensa valorRecompensa={10} />

      <Fruta nome="Gomu Gomu no Mi" tipo="Paramecia" imagem="https://pm1.aminoapps.com/6309/b9d6ca1c72f20877d9ee0c3aa3d2345502c10a64_hq.jpg" />
    </>
  )
}

export default App
