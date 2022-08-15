import * as Web3 from '@solana/web3.js';

import { ChangeEvent, useCallback, useState } from 'react';
import { MdInfoOutline, MdOutlinePayments } from 'react-icons/md';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

import { Bounty } from 'types/bounty';
import Button from 'components/common/button';
import Card from 'components/common/card';
import Chip from 'components/common/chip';
import { TbWallet } from 'react-icons/tb';
import Text from 'components/common/text';
import TransactionCard from './transaction-card';
import { useBalance } from 'hooks/use-balance';
import { useSWRConfig } from 'swr';

const FundTab = ({ address, reward }: Bounty) => {
    const { balance } = useBalance();
    const { connection } = useConnection();
    const [amount, setAmount] = useState<number>();
    const { mutate } = useSWRConfig();
    const { publicKey, sendTransaction } = useWallet();

    const onAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newAmount = Number(e.target.value);
        if (newAmount <= 0) setAmount(null);
        setAmount(newAmount);
    };

    const onSend = useCallback(async () => {
        if (!publicKey) {
            alert('Wallet not connected');
            return;
        }

        let signature: Web3.TransactionSignature = '';
        try {
            const transaction = new Web3.Transaction().add(
                Web3.SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: new Web3.PublicKey(address),
                    lamports: Web3.LAMPORTS_PER_SOL * amount,
                }),
            );

            signature = await sendTransaction(transaction, connection);

            await connection.confirmTransaction(signature, 'confirmed');

            // Mutate SWR cache to view updated balance
            mutate('balance');

            alert(`Transaction successful: ${signature}`);
            console.log(`Transaction successful: ${signature}`);
        } catch (error) {
            alert('Transaction failed');

            return;
        }
    }, [publicKey, address, amount, sendTransaction, connection, mutate]);

    return (
        <section title="actions" className="flex flex-col gap-10 md:flex-row">
            <div className="flex w-full flex-col gap-7">
                <div className="flex w-full flex-col gap-5">
                    <Text
                        variant="heading"
                        className="flex-shrink-0 whitespace-nowrap"
                    >
                        Current reward
                    </Text>
                    <Card className="flex w-full flex-col gap-3 border-none !bg-gradient-to-tr from-primary/75 to-secondary/75 p-5">
                        <Text variant="sub-heading">
                            {reward}{' '}
                            <span className="text-lg font-light">SOL</span>
                        </Text>
                        <div className="flex w-full flex-row justify-end">
                            <Chip highlightValue="3" value="donors" />
                        </div>
                    </Card>
                </div>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <Text variant="heading">Send payment</Text>
                        <Text
                            variant="label"
                            className="!normal-case text-secondary"
                        >
                            Choose between...
                        </Text>
                    </div>
                    <div className="flex flex-row gap-7">
                        <div className="flex w-fit flex-col gap-5">
                            <Text
                                variant="label"
                                className="flex w-full flex-row items-center justify-between"
                            >
                                Solana Pay
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
                            </Text>
                            {/* TODO: Placeholder for Sol Pay QR code. */}
                            <div className="aspect-square h-40 rounded-lg bg-white" />
                        </div>
                        <div className="h-48 w-px bg-line" />
                        <div className="flex h-full w-full max-w-full flex-col gap-5">
                            <Text variant="label">Using your wallet</Text>
                            <div className="flex flex-col gap-2">
                                <Card className="flex flex-row items-center justify-between p-5">
                                    <div className="flex flex-col gap-2">
                                        {publicKey ? (
                                            <Text variant="paragraph">
                                                {balance || 0}
                                                <span className="text-sm font-light">
                                                    {' '}
                                                    SOL
                                                </span>
                                            </Text>
                                        ) : (
                                            <Text variant="paragraph">
                                                Wallet Not Connected
                                            </Text>
                                        )}
                                    </div>
                                    {/* Placehold for user's wallet provider logo */}
                                    <div className="flex aspect-square h-9 items-center justify-center rounded-full bg-white text-black">
                                        <TbWallet size={25} />
                                    </div>
                                </Card>
                                <div className="flex flex-row flex-wrap gap-2">
                                    <div className="background-transparent group flex h-11 w-full min-w-fit flex-[1_1_fit-content] flex-row items-center justify-between gap-3 rounded-full border border-white px-5 py-3 text-white">
                                        <div className="flex flex-row items-center gap-3">
                                            <MdOutlinePayments size={20} />
                                            <input
                                                className="w-28 bg-transparent text-sm tracking-wide text-secondary outline-none valid:text-primary"
                                                onChange={onAmountChange}
                                                placeholder="Enter amount..."
                                                type="number"
                                                value={amount}
                                            />
                                        </div>
                                        <Text variant="label">SOL</Text>
                                    </div>
                                    <Button
                                        disabled={!(amount && publicKey)}
                                        onClick={onSend}
                                        variant="orange"
                                        text="Send"
                                        className="flex-[2_2_fit-content]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-5">
                <Text variant="heading">Recent donations</Text>

                <div className="flex w-full flex-col gap-3 md:w-98">
                    <div className="flex flex-row justify-between gap-3 px-3 text-base-content">
                        <div className="flex w-2/3 flex-row items-center gap-3">
                            <Text variant="label" className="w-2/3">
                                Signature
                            </Text>
                            <Text variant="label" className="w-1/3">
                                Amt · SOL
                            </Text>
                        </div>
                        <div className="flex w-1/3 flex-row items-center gap-3">
                            <Text variant="label" className="w-1/2">
                                Date
                            </Text>
                            <Text variant="label" className="w-1/2 text-right">
                                Status
                            </Text>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <TransactionCard
                            signature="3ddYMpSzCPx4cBAqxnj7ZhDmbphbd8ebQb2xLGYe2qYTVsQTYpsW1D1DCjenMvcbb9RC7PQWj8Np3rkhEqxGZpxc"
                            amount={300}
                            date="Aug 08"
                            status="success"
                        />
                        <TransactionCard
                            signature="3ddYMpSzCPx4cBAqxnj7ZhDmbphbd8ebQb2xLGYe2qYTVsQTYpsW1D1DCjenMvcbb9RC7PQWj8Np3rkhEqxGZpxc"
                            amount={300}
                            date="Aug 08"
                            status="failed"
                        />
                        <TransactionCard
                            signature="3ddYMpSzCPx4cBAqxnj7ZhDmbphbd8ebQb2xLGYe2qYTVsQTYpsW1D1DCjenMvcbb9RC7PQWj8Np3rkhEqxGZpxc"
                            amount={300}
                            date="Aug 08"
                            status="pending"
                        />
                        <TransactionCard
                            signature="3ddYMpSzCPx4cBAqxnj7ZhDmbphbd8ebQb2xLGYe2qYTVsQTYpsW1D1DCjenMvcbb9RC7PQWj8Np3rkhEqxGZpxc"
                            amount={300}
                            date="Aug 08"
                            status="success"
                        />
                        <TransactionCard
                            signature="3ddYMpSzCPx4cBAqxnj7ZhDmbphbd8ebQb2xLGYe2qYTVsQTYpsW1D1DCjenMvcbb9RC7PQWj8Np3rkhEqxGZpxc"
                            amount={300}
                            date="Aug 08"
                            status="failed"
                        />
                        <TransactionCard
                            signature="3ddYMpSzCPx4cBAqxnj7ZhDmbphbd8ebQb2xLGYe2qYTVsQTYpsW1D1DCjenMvcbb9RC7PQWj8Np3rkhEqxGZpxc"
                            amount={300}
                            date="Aug 08"
                            status="success"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FundTab;
