import Button from 'components/common/button';
// import Image from 'components/common/image';
import Image from 'next/image';
import Text from 'components/common/text';
import SearchBar from 'components/common/search-bar';
import { useState, useRef } from 'react';
import { cn } from 'utils';
import { VscGithubAlt } from 'react-icons/vsc';
import { MdMenu, MdPerson } from 'react-icons/md';
import NavElement from './nav-element';
import { BiWalletAlt } from 'react-icons/bi';
import DropDown from './drop-down/DropDown';

const Header = () => {
    // a variable based on the github authentication (state or anything)
    const loggedIn = true;

    const buttonRef = useRef();
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <header className="sticky top-0 z-50 flex h-20 w-full flex-row items-center justify-between border-b-1.5 border-b-line bg-black/25 px-6 backdrop-blur-xl backdrop-filter">
            <Image
                src="/logo.svg"
                alt="logo"
                width={175}
                height={27}
                // priority
            />

            <div className="hidden h-fit flex-row items-center gap-5 text-white md:flex">
                <div className="flex flex-row gap-7">
                    {/* TODO Add `TabbedLayout? */}
                    <NavElement label="home" href="/" />
                    <NavElement label="explorer" href="/explorer" />
                </div>

                <div className="h-8 w-px bg-line" />

                <SearchBar />

                <div className="h-8 w-px bg-line" />

                <DropDown loggedIn={loggedIn} />
            </div>

            <div className="inline md:hidden">
                <Button variant="transparent">
                    <MdMenu className="aspect-square h-4" />
                </Button>
            </div>
        </header>
    );
};

export default Header;
