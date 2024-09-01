import './App.css'
import BackgroundCarousel from './components/BackgroundCarousel';
import Loader from './components/Loader';
import { Navbar } from './components/Navbar';
import { Portfolio } from './components/Portfolio';
import ReactGA from "react-ga4";

function App() {
  const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID;
  ReactGA.initialize([
    {
      trackingId: GA4_MEASUREMENT_ID,
    }
  ]);

  ReactGA.send({ hitType: "pageview", page: '/', title: '/' });
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
