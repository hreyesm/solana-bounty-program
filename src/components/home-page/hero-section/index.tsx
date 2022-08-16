import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { signIn, useSession } from 'next-auth/react';

import Button from 'components/common/button';
import Headlines from './headlines';
import Image from 'components/common/image';
import Link from 'next/link';
import { MdOutlineExplore } from 'react-icons/md';
import React from 'react';
import { TbBrandGithub } from 'react-icons/tb';
import Text from 'components/common/text';
import { cn } from 'utils';

const HeroSection = () => {
    const { data: session } = useSession();

    const [MousePosition, setMousePosition] = React.useState({
        left: 0,
        top: 0,
    });

    function handleMouseMove(ev) {
        setMousePosition({ left: ev.pageX, top: ev.pageY });
    }

    return (
        <section
            className={cn(
                'relative flex h-[calc(100vh_-_5rem)] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-black to-transparent md:mt-0 md:flex-row md:justify-start',
            )}
            onMouseMove={ev => handleMouseMove(ev)}
        >
            <div
                className="spotlight absolute hidden h-full w-full sm:block"
                style={{
                    background: `radial-gradient(circle at ${MousePosition.left}px ${MousePosition.top}px, rgba(240, 117, 70, 0.765) 0%, rgba(203, 68, 184, 0) 60%, rgba(219, 65, 75, 0) 60%)`,
                }}
            ></div>
            <div
                className="absolute block aspect-square h-[130%] sm:hidden"
                style={{
                    background: `radial-gradient(circle at center 30%, rgba(240, 117, 70, 0.765) 0%, rgba(203, 68, 184, 0) 40%, rgba(219, 65, 75, 0) 40%)`,
                }}
            ></div>
            <div className="relative flex h-full w-full flex-col items-center justify-evenly px-4 pt-20 text-left sm:px-8 sm:pt-10 md:items-start md:px-16 lg:px-32 xl:px-64">
                <Text variant="hero">
                    <span style={{ color: '#F07546' }}>Bounties</span> are here.
                    <br />
                    Do you have what it takes?
                </Text>
                <Headlines />
                <div className="flex w-full flex-row flex-wrap justify-center gap-4 md:justify-start">
                    <Link href={session ? `/${session.login}` : '/#'} passHref>
                        <a className="flex-1 sm:flex-none">
                            <Button
                                icon={!session && TbBrandGithub}
                                text={
                                    !session
                                        ? 'Sign In with GitHub'
                                        : 'View your profile'
                                }
                                variant="orange"
                                className="!w-full"
                                onClick={() => {
                                    if (!session) {
                                        signIn('github');
                                    }
                                }}
                                reversed={session !== null}
                            >
                                {session && (
                                    <Image
                                        alt="Avatar"
                                        src={session.user.image}
                                        height={23}
                                        className="aspect-square"
                                        style={{ borderRadius: '50%' }}
                                    />
                                )}
                            </Button>
                        </a>
                    </Link>
                    <Link href="/explorer" passHref>
                        <a className="flex-1 sm:flex-none">
                            <Button
                                icon={MdOutlineExplore}
                                text="Start Exploring"
                                variant="transparent"
                                className="!w-full"
                            />
                        </a>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
