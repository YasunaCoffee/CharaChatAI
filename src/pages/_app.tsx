import { Auth0Provider } from '@auth0/auth0-react';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN || ""}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || ""}    
      authorizationParams={{
        redirect_uri: typeof window !== "undefined" ? window.location.origin : ""
      }}
    >
      <Component {...pageProps} />
    </Auth0Provider>
  );
}

export default MyApp;

