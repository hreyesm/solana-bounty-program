import '../styles/globals.css';

import { AppProps } from 'next/app';
import Layout from 'components/common/layout';
import { SessionProvider } from 'next-auth/react';
import { ContextProvider } from 'components/common/context/ContextProvider';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
    <ContextProvider>
        <SessionProvider session={session}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </SessionProvider>
    </ContextProvider>
);

export default App;
