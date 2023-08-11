import '@/styles/globals.css'
import AuthContextProvider from '@/utilities/AuthContext'

export default function App({ Component, pageProps }) {
  return <AuthContextProvider>
    <Component {...pageProps} />
  </AuthContextProvider> 
}
