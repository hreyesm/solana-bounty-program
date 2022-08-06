import Button from "components/common/button";
import Card from "components/common/card";
import Chip from "components/common/chip";
import Text from "components/common/text";
import { MdInfoOutline, MdLink, MdOutlinePayments, MdOutlineSearch } from "react-icons/md";
import { TbWallet } from "react-icons/tb";

const FundTab = () => {
    const walletAddress = 'FNfUy8Qp6C9NCD6cz9xHLYSL7n3eFX8LfY1zDx6RcE8G';

    return (
        <section
            title="actions"
            className="flex flex-col gap-5"
        >
            <div className="flex flex-col gap-7 w-fit">
                <div className="flex flex-row gap-7">
                    <div className="flex flex-col gap-5 w-full">
                        <div className="flex flex-col gap-2">
                            <Text variant="heading"> Bounty address </Text>
                            <Text variant="label" className="text-secondary max-w-xs !normal-case"> Use this to make a payment manually or retrieve additional information. </Text>
                        </div>
                        <div className="flex flex-row items-center gap-1">
                            <Chip
                                highlightValue={walletAddress}
                                icon={MdLink}
                                className="w-44 !normal-case"
                                href={`https://explorer.solana.com/address/${walletAddress}`}
                            />
                            <Chip copyValue={walletAddress} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 w-max">
                        <Text variant="heading" className="flex-shrink-0 whitespace-nowrap"> Current reward </Text>
                        <Card className="flex flex-col gap-3 p-5 w-full !bg-gradient-to-tr from-primary/75 to-secondary/75 border-none">
                            <Text variant="sub-heading"> 300 <span className="font-light text-lg"> SOL </span> </Text>
                            <div className="flex flex-row justify-end w-full">
                                <Chip highlightValue="3" value="donors" />
                            </div>
                        </Card>
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <Text variant="heading"> Send payment </Text>
                        <Text variant="label" className="text-secondary !normal-case"> Choose between... </Text>
                    </div>
                    <div className="flex flex-row gap-7 h-min">
                        <div className="w-fit flex flex-col gap-5">
                            <Text variant="label" className="w-full flex flex-row items-center justify-between">
                                Solana Pay
                                <a href="https://solanapay.com/" target="_blank" rel="noopener noreferrer">
                                    <MdInfoOutline size={15} className="aspect-square" />
                                </a>
                            </Text>
                            {/* TODO: Placeholder for Sol Pay QR code. */}
                            <div className="h-40 aspect-square rounded-lg bg-white" />
                        </div>
                        <div className="w-px h-48 bg-line" />
                        <div className="flex flex-col gap-5 h-full">
                            <Text variant="label"> Using your wallet </Text>
                            <div className="flex flex-col gap-2">
                                <Card className="flex flex-row items-center justify-between p-5">
                                    <div className="flex flex-col gap-2">
                                        <Text variant="label" className="text-secondary"> Current balance </Text>
                                        <Text variant="paragraph"> 300 <span className="font-light text-sm"> SOL </span> </Text>
                                    </div>
                                    {/* Placehold for user's wallet provider logo */}
                                    <div className="h-9 flex items-center justify-center aspect-square bg-white text-black rounded-full">
                                        <TbWallet size={25} />
                                    </div>
                                </Card>
                                <div className="flex flex-row gap-2">
                                    <div className="group flex flex-row items-center justify-between h-11 px-5 py-3 rounded-full border border-white text-white background-transparent w-full">
                                        <div className="flex flex-row items-center gap-3">
                                            <MdOutlinePayments size={20} />
                                            <input
                                                className="outline-none bg-transparent text-sm tracking-wide text-secondary valid:text-primary"
                                                placeholder="Enter amount..."
                                                type="text"
                                            />
                                        </div>
                                        <Text variant="label"> SOL </Text>
                                    </div>
                                    <Button variant="orange" text="Send" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FundTab;
