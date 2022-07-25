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

                <div className="dropdown-end dropdown">
                    <button
                        className={cn(
                            'flex h-fit max-h-full w-fit items-center justify-center gap-3 rounded-full border px-5 py-3 transition-all hover:-translate-y-[0.2rem] hover:bg-white hover:!text-black active:translate-y-[0.05rem] active:scale-95',
                            loggedIn
                                ? 'text-white'
                                : 'border-transparent bg-primary text-black',
                        )}
                        onClick={() => {
                            if (menuOpen) buttonRef.current.blur();
                            setMenuOpen(!menuOpen);
                        }}
                        ref={buttonRef}
                    >
                        <Text variant="input">
                            {loggedIn ? <MdPerson /> : 'Log in / Sign up'}
                        </Text>
                    </button>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu rounded-box mt-3 w-52 bg-base pt-2 pb-2 shadow"
                    >
                        <li>
                            <div className="flex justify-between">
                                <div>
                                    <Text
                                        variant="label"
                                        className="opacity-50"
                                    >
                                        Profile
                                    </Text>
                                    <br />
                                    <p>Login with GitHub</p>
                                </div>
                                <VscGithubAlt size={25} />
                            </div>
                        </li>
                        <hr className="w-full opacity-50" />
                        <li>
                            <div className="flex justify-between">
                                <div>
                                    <Text
                                        variant="label"
                                        className="opacity-50"
                                    >
                                        Wallet
                                    </Text>
                                    <br />
                                    {/* Here will be the wallet connection button */}
                                    <p>Connect</p>
                                </div>
                                <BiWalletAlt size={25} />
                            </div>
                        </li>
                    </ul>
                </div>
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
