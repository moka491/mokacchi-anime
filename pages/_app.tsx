import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from 'components/shared/Navbar'
import { AuthProvider } from 'context/AuthContext'

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <div className="bg-bgPrimary flex h-screen flex-col">
        <Navbar />

        <Component {...pageProps} />
      </div>
    </AuthProvider>
  )
}

export default App
