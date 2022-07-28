import React from 'react';
import Button from 'components/common/button';
import Text from 'components/common/text';
import { useState, useRef } from 'react';
import { cn } from 'utils';
import { VscGithubAlt } from 'react-icons/vsc';
import { MdMenu, MdPerson } from 'react-icons/md';
import { BiWalletAlt } from 'react-icons/bi';

function DropDown(props) {
    const loggedIn = props.loggedIn;
    const buttonRef = useRef();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
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
                            <Text variant="label" className="opacity-50">
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
                            <Text variant="label" className="opacity-50">
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
    );
}

export default DropDown;
