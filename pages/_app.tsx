import '../styles/globals.css'
import { AuthUserProvider } from '../context/AuthUserContext';
import { FirestoreProvider } from '../context/FirestoreContext';
import ProtectedRoute from '../components/navigation/ProtectedRoute';
import Layout from '../components/Layout';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  const routesAnonymousCanAcess: string[] = ['/card/[cardId]'];
  const routesToprotect: string[] = ['/card/[cardId]'];
  return <AuthUserProvider>
    <FirestoreProvider>
      <Layout>
        <ProtectedRoute protectedRoutes={routesToprotect} routesAnonymousCanAcess={routesAnonymousCanAcess}>
          <Component {...pageProps} />
        </ProtectedRoute>
      </Layout>
    </FirestoreProvider>
  </AuthUserProvider>
}

export default MyApp
