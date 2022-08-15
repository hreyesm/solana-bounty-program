/* eslint-disable indent */
import * as Web3 from '@solana/web3.js';

import { MdInfoOutline, MdOutlinePayments } from 'react-icons/md';
import { useEffect, useState } from 'react';

import { Bounty } from 'types/bounty';
import Button from 'components/common/button';
import Card from 'components/common/card';
import Chip from 'components/common/chip';
import Image from 'components/common/image';
import { TbWallet } from 'react-icons/tb';
import Text from 'components/common/text';
import TransactionCard from './transaction-card';
import { useWallet } from '@solana/wallet-adapter-react';

const FundTab = ({ reward }: Bounty) => {
    const [balance, setBalance] = useState(0);
    const { publicKey } = useWallet();

    useEffect(() => {
        try {
            const connection = new Web3.Connection(
                Web3.clusterApiUrl('devnet'),
            );
            publicKey
                ? connection.getBalance(publicKey).then(b => {
                      setBalance(b / Web3.LAMPORTS_PER_SOL)
                  })
                : setBalance(0);
        } catch (error) {
            setBalance(0);
            alert(error);
        }
    }, [publicKey]);

    return (
        <section title="actions" className="flex flex-col gap-7">
            <div className="flex flex-col gap-2">
                <Text variant="big-heading">
                    Make a payment
                </Text>
                <Text
                    variant="label"
                    className="!normal-case text-secondary"
                >
                    Choose between...{' '}
                </Text>
            </div>
            <div className="flex flex-col gap-10 h-max md:flex-row">
                <div className="flex flex-col gap-5 w-full">
                    <div className="flex flex-row items-center gap-3">
                        <Text variant="heading">Solana Pay</Text>
                        <a
                             href="https://solanapay.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <MdInfoOutline
                                size={15}
                                className="aspect-square"
                            />
                        </a>
                    </div>
                    <Card className="w-full md:h-full flex justify-center items-center p-5 !bg-transparent">
                        <div className="aspect-square w-80 h-80 rounded-lg bg-white" />
                    </Card>
                </div>

                <div className="flex w-full flex-col gap-5 h-full">
                <div className="flex flex-row items-center gap-3">
                        <Text variant="heading">Send manually</Text>
                        <div
                            className="tooltip"
                            data-tip="Please ensure you know what you're doing - This action cannot be undone"
                        >
                            <MdInfoOutline
                                size={15}
                                className="aspect-square"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Card className="flex w-full flex-col gap-3 border-none !bg-gradient-to-tr from-primary/75 to-secondary/75 p-5">
                            <Text variant="label"> Current funding </Text> 
                            <div className="w-full flex flex-row justify-center items-center gap-3">
                                <Text variant="big-heading"> {reward} </Text>
                                <Text variant="sub-heading" className="font-light"> SOL </Text>
                            </div>
                            <div className="flex w-full flex-row justify-end">
                                <Image
                                    src="/logo-icon.svg"
                                    alt="solana icon"
                                    width={20}
                                    height={17.89}
                                    className="saturate-0"
                                />                        
                            </div>
                        </Card>

                        <Card className={cn(
                            "flex w-full flex-col items-end gap-3 p-5",
                            !publicKey && "opacity-50"
                        )}>
                            <Text variant="label"> Your {walletName} wallet </Text>
                            <div className="w-full flex flex-col gap-5 items-center justify-center">
                                {publicKey ? (<>
                                        <div className="flex flex-row items-center gap-3">
                                            <Text variant="big-heading"> {balance.toFixed(2)} </Text>
                                            <Text variant="sub-heading" className="font-light"> SOL </Text>
                                        </div>

                                        <div className="flex flex-row flex-wrap gap-2">
                                            <div className="background-transparent group flex h-11 w-full min-w-fit flex-[1_1_fit-content] flex-row items-center justify-between gap-3 rounded-full border border-white px-5 py-3">
                                                <div className="flex flex-row items-center gap-3">
                                                    <MdOutlinePayments size={20} />
                                                    <input
                                                        className="w-28 bg-transparent text-sm tracking-wide text-secondary outline-none valid:text-primary"
                                                        placeholder="Enter amount..."
                                                        type="text"
                                                    />
                                                </div>
                                                <Text variant="label">SOL</Text>
                                            </div>
                                            <Button
                                                variant="orange"
                                                text="Send"
                                                className="flex-[2_2_fit-content]"
                                            />
                                        </div>
                                </>) : (
                                    <div className="flex flex-row items-center gap-2">
                                        <Text variant="paragraph"> Not connected </Text>
                                        <div
                                            className="tooltip"
                                            data-tip="Connect a wallet via the integration menu to see your balance"
                                        >
                                            <MdInfoOutline
                                                size={15}
                                                className="aspect-square"
                                            />
                                        </div>
                                    </div>
                                )}
                                </div>
                            <div className="flex w-full flex-row justify-start">
                                {publicKey ? (
                                    <Image
                                        src={walletImage}
                                        alt="wallet icon"
                                        height={20}
                                    />
                                ) : (
                                    <TbWallet size={20} />
                                )}
                            </div> 
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FundTab;
