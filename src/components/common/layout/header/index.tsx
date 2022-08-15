import Button from 'components/common/button';
import Image from 'components/common/image';
import Link from 'next/link';
import { MdOutlineSearch } from 'react-icons/md';
import NavElement from './nav-element';
import OverflowMenu from 'components/common/overflow-menu';
import Text from 'components/common/text';
import { useKBar } from 'kbar';

const Header = () => {
    const { query } = useKBar();

    return (
        <header className="sticky top-0 z-50 flex h-20 w-full flex-row items-center justify-between border-b-1.5 border-b-line bg-black bg-opacity-40 px-6 backdrop-blur-xl">
            <Link href="/" passHref>
                <div className="flex w-fit flex-row items-center gap-3 md:gap-6">
                    <Image
                        src="/logo-icon.svg"
                        alt="solana icon"
                        width={29.16}
                        height={26.08}
                    />
                    <div className="flex flex-row items-center gap-3">
                        <Image
                            src="/logo-text.svg"
                            alt="solana text"
                            className="hidden md:inline"
                            width={134.46}
                            height={20.1}
                        />
                        <Text
                            variant="label"
                            className="font-thin !tracking-widest text-white"
                        >
                            {' '}
                            Bounty{' '}
                        </Text>
                    </div>
                </div>
            </Link>
            <div className="flex h-full flex-row items-center gap-5 text-white">
                <div className="flex h-2/3 flex-row gap-5 self-end sm:gap-7">
                    <NavElement label="Home" href="/" />
                    <NavElement label="Explorer" href="/explorer" />
                </div>

                <div className="h-1/2 w-px bg-line" />

                <div className="flex h-full flex-row items-center gap-3 md:gap-5">
                    <Button
                        variant="transparent"
                        icon={MdOutlineSearch}
                        className="group hidden md:flex"
                        onClick={query.toggle}
                    >
                        <div className="flex gap-0.5">
                            <kbd className="kbd kbd-xs bg-black/50 group-hover:bg-black/80 group-hover:text-white">
                                {' '}
                                ctrl{' '}
                            </kbd>
                            <kbd className="kbd kbd-xs bg-black/50 group-hover:bg-black/80 group-hover:text-white">
                                {' '}
                                k{' '}
                            </kbd>
                        </div>
                    </Button>

                    <Button
                        variant="transparent"
                        icon={MdOutlineSearch}
                        className="flex md:hidden"
                        onClick={query.toggle}
                    />

                    <div className="hidden h-1/2 w-px bg-line md:inline" />

                    <OverflowMenu />
                </div>
            </div>
        </header>
    );
};

export default Header;
