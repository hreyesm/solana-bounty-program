import Card from 'components/common/card';
import Image from 'components/common/image';
import Text from 'components/common/text';

const Footer = () => (
    <footer className="my-16 flex flex-col justify-center gap-16 px-4 text-white md:px-16 lg:px-32 xl:px-48">
        <div className="h-px w-full bg-line" />
        <Card className="flex w-full flex-row justify-between rounded-xl p-7">
            <div className="flex flex-row items-center gap-3">
                <Image
                    src="/logo-icon.svg"
                    alt="solana icon"
                    width={20}
                    height={17.89}
                    className="saturate-0"
                />
                <Text
                    variant="label"
                    className="font-thin !tracking-widest text-white"
                >
                    {' '}
                    Bounty{' '}
                </Text>
            </div>
            <Text variant="label" className="font-light">
                Powered by{' '}
                <a
                    href="https://solana.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary"
                >
                    Solana
                </a>
            </Text>
        </Card>
    </footer>
);

export default Footer;
