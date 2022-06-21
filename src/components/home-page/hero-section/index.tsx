import Button from 'components/common/button';
import Image from 'next/image';

const HeroSection = () => (
    <section
        title="hero"
        className="relative flex h-screen w-screen flex-col items-center justify-center bg-black"
    >
        <div
            className="absolute -left-3/4 z-0 h-screen w-screen"
            style={{
                background:
                    'radial-gradient(50% 50% at 50% 50%, rgb(106, 108, 253) 0%, rgba(0, 0, 0, 0) 100%)',
            }}
        ></div>
        <div
            style={{
                background:
                    'radial-gradient(45.5% 47.88% at 45% 50.47%, rgb(255, 0, 199) 0%, rgba(0, 0, 0, 0) 100%)',
            }}
            className="relative top-32 z-0 w-screen sm:absolute sm:top-0 sm:right-0 sm:h-screen sm:w-1/2"
        >
            <Image src="/hero.svg" alt="hero background" layout="fill" />
            <img className="invisible" src="/hero.svg" alt="placeholder"></img>
        </div>
        <div className="relative -top-12 z-50 flex flex-col gap-8 px-5 text-left sm:top-0 sm:-left-12">
            <h1 className="text-6xl font-medium text-white">
                Bounties.
                <br />
                Do you have what it takes?
            </h1>
            <p className="w-full text-lg text-white sm:w-7/12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ad sed
                adipiscing volutpat tincidunt amet vulputate porta est.
            </p>
            <div className="flex gap-4">
                <Button text="Fund Bounty" variant="green" />
                <Button text="Start Exploring" variant="transparent" />
            </div>
        </div>
    </section>
);

export default HeroSection;
