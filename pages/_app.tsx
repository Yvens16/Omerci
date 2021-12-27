import '../styles/globals.css'
import { AuthUserProvider } from '../context/AuthUserContext';
import { FirestoreProvider } from '../context/FirestoreContext';
import ProtectedRoute from '../components/navigation/ProtectedRoute';
import Layout from '../components/Layout';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  const routesToprotect: string[] = [];
  return <AuthUserProvider>
    <FirestoreProvider>
      <Layout>
        <ProtectedRoute protectedRoutes={routesToprotect}>
          <Component {...pageProps} />
        </ProtectedRoute>
      </Layout>
    </FirestoreProvider>
  </AuthUserProvider>
}

export default MyApp
