import '../styles/globals.css';

import { AppProps } from 'next/app';
import Layout from 'components/common/layout';
import { SessionProvider } from 'next-auth/react';
import { ContextProvider } from 'components/common/context/ContextProvider';
import Search from 'components/common/Search';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
    <ContextProvider>
        <Search>
            <SessionProvider session={session}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </SessionProvider>
        </Search>
    </ContextProvider>
);
export default App;
