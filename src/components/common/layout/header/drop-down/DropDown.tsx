import React from 'react';
import Button from 'components/common/button';
import Text from 'components/common/text';
import { useState, useRef } from 'react';
import { cn } from 'utils';
import { VscGithubAlt } from 'react-icons/vsc';
import { MdMenu, MdPerson } from 'react-icons/md';
import { Menu } from './Menu';

export default function DropDown(props) {
    const loggedIn = props.loggedIn;
    const buttonRef = useRef();
    const menuOpen = props.menuOpen;
    const setMenuOpen = props.callBack;

    return (
        <>
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
                        {/* {loggedIn ? <MdPerson /> : 'Log in / Sign up'} */}
                        <MdPerson />
                    </Text>
                </button>
                <Menu className="hidden md:block"/>
            </div>
        </>
    );
}
