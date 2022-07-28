import Footer from './footer';
import Header from './header';
import { Menu } from './header/drop-down/Menu';
import React from 'react';

function Layout({ children }) {
    const [menuOpen, setMenuOpen] = React.useState(false);
    console.log(menuOpen);

    return (
        <div className="flex min-h-screen flex-col">
            <Header menuOpen={menuOpen} callBack={setMenuOpen}/>
            <main className="flex grow flex-col gap-16 md:gap-32">
                {children}{' '}
                {menuOpen &&
                        <Menu className=" bottom-0 md:hidden fixed" />}
            </main>
            <Footer />
        </div>
    );
}

export default Layout;
