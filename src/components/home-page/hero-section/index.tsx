import Button from 'components/common/button';
import Image from 'next/image';
import {cn} from 'utils';
import Text from 'components/common/text';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Headline from './component/Headline';
import React from 'react';

const HeroSection = () => {
    const [MousePosition, setMousePosition] = React.useState({
        left: 0,
        top: 0,
    });
    console.log(MousePosition);

    function handleMouseMove(ev) {
        setMousePosition({ left: ev.pageX, top: ev.pageY });
    }

    return (
        <section
            title="hero"
            className={cn(
                'relative flex h-screen w-full flex-col items-center justify-center bg-black md:mt-0 md:flex-row md:justify-start',
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
                className="absolute block h-full w-full sm:hidden"
                style={{
                    background: `radial-gradient(circle at center 30%, rgba(240, 117, 70, 0.765) 0%, rgba(203, 68, 184, 0) 40%, rgba(219, 65, 75, 0) 40%)`,
                }}
            ></div>
            <div className="relative z-40 flex h-full w-full flex-col items-center justify-evenly px-4 sm:pt-10 pt-20 text-left sm:px-8 md:items-start md:px-16 lg:px-32 xl:px-64">
                <Text variant="hero" className="text-white">
                    <span style={{ color: '#F07546' }}>Bounties</span> are here.
                    <br />
                    Do you have what it takes?
                </Text>
                <Headline />
                <div className="flex gap-4">
                    <Button text="Fund Bounty" variant="orange" />
                    <Button text="Start Exploring" variant="transparent" />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
