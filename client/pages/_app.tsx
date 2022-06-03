import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
function MyApp({ Component, pageProps }: AppProps) {
  return (<>
  <body >
    <Navbar />
    <Component  {...pageProps} />
    <Footer />
  </body>
  </>)
}

export default MyApp
