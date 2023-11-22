import { Auth0Provider } from '@auth0/auth0-react';

<Auth0Provider
  domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN || ""}
  clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || ""}
  onRedirectCallback={() => window.location.origin}
>
  <LoginPage />
</Auth0Provider>

// New login page
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const { loginWithRedirect } = useAuth0();
  const router = useRouter();

  React.useEffect(() => {
    loginWithRedirect();
  }, []);

  return (
    <div>
      <h1>ログインページ</h1>
      <button onClick={() => loginWithRedirect()}>ログイン</button>
    </div>
  );
}
