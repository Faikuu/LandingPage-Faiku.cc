import './App.css'
import BackgroundCarousel from './components/BackgroundCarousel';
import Loader from './components/Loader';
import { Navbar } from './components/Navbar';
import { Portfolio } from './components/Portfolio';

function App() {
  return (
    <>
      <BackgroundCarousel/>
      <Navbar/>
      <Portfolio/>
      <Loader/>
    </>
  )
}

export default App
