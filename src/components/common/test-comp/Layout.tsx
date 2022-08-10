import * as React from 'react';
import { useKBar } from 'kbar';
import Logo from './Logo';

interface Props {
    children: React.ReactNode;
}

export default function Layout(props: Props) {
    const { query } = useKBar();
    return (
        <div>
            <div>
                <button onClick={query.toggle}>
                    <Logo />
                </button>
                <h1>kbar</h1>
            </div>
            {props.children}
            <footer style={{ marginTop: 'var(--unit)' }}>
                <a
                    href="https://twitter.com/timcchang"
                    rel="noreferrer"
                    target="_blank"
                    style={{ textDecoration: 'none' }}
                >
                    @timcchang
                </a>
            </footer>
        </div>
    );
}
