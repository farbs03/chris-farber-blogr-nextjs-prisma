import { AppProps } from "next/app";
import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;
