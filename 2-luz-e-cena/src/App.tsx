import Banner from "./Components/Banner";
import Header from "./Components/Header";
import Link from "./Components/Link/link";
import MovieSection from "./Components/MovieSection";

function App() {
  return (
    <>
      <Header/>
      <Banner src="./capas/Banner Desktop.png" alt="Banner"/>
      <Link href="/" target="_blank">
                Link
      </Link>
      <MovieSection/>
    </>
  )
}

export default App
