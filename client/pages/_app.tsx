import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
function MyApp({ Component, pageProps }: AppProps) {

  return (<>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <Navbar />
    <Component  {...pageProps} />
    <Footer />
  </>)
}

export default MyApp;

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, unknown>>> {
  return {
    props: {
      approved: true
    }
  }
}
