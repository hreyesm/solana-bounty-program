import '../styles/globals.css';

import { AppProps } from 'next/app';
import Layout from 'components/common/layout';
import { SessionProvider } from 'next-auth/react';
import Search from 'components/common/Search';
const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
    <Search>
        <SessionProvider session={session}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </SessionProvider>
    </Search>
);
export default App;
