import Banner from "./Components/Banner";
import Header from "./Components/Header";
import Link from "./Components/Link/link";

function App() {
  return (
    <>
      <Header/>
      <Banner src="./capas/Banner Desktop.png" alt="Banner"/>
      <Link href="/" target="_blank">
                Link
      </Link>
    </>
  )
}

export default App
