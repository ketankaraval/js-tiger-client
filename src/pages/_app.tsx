import '../styles/global.css';

import { GoogleOAuthProvider } from '@react-oauth/google';
import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <GoogleOAuthProvider clientId="68405008526-idvm3joeqi3p3pdg6ga584s322h2hhb0.apps.googleusercontent.com">
    <Component {...pageProps} />
  </GoogleOAuthProvider>
);

export default MyApp;
