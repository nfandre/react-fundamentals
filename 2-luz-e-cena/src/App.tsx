import Banner from "./Components/Banner";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Link from "./Components/Link/link";
import MovieSection from "./Components/MovieSection";
import Newsletter from "./Components/Newsletter";

function App() {
  return (
    <>
      <Header/>
      <Banner src="./capas/Banner Desktop.png" alt="Banner"/>
      <Link href="/" target="_blank">
                Link
      </Link>
      <MovieSection/>
      <Banner src="./capas/Banner Combo Desktop.png" alt="Combo"></Banner>
      <Newsletter/>
      <Footer/>
    </>
  )
}

export default App
