import '../styles/globals.css'
import Layout from '../components/Layout'
import { DataProvider } from '../store/GlobalState'

function MyApp({ Component, pageProps }) {
  return (
    <DataProvider>
      <Layout style={{paddingTop: '100px'}}>
        <Component {...pageProps} />
      </Layout>
    </DataProvider>
  )
}

export default MyApp
