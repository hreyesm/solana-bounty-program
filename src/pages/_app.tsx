import '../styles/globals.css';

import { AppProps } from 'next/app';
import Layout from 'components/common/layout';
import { SessionProvider } from 'next-auth/react';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
    <SessionProvider session={session}>
        <Layout>
            <Component {...pageProps} />
        </Layout>
    </SessionProvider>
);

export default App;
