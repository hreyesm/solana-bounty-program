import Card from 'components/common/card';
import Text from 'components/common/text';
import Link from 'next/link';
import { cn } from 'utils';

type TransactionCardProps = {
    width?: string;
    signature: string;
    amount: number;
    date: string;
    status: 'failed' | 'pending' | 'success';
};

const statuses = {
    failed: 'bg-red-500',
    pending: 'bg-yellow-500',
    success: 'bg-green-500',
};

const TransactionCard = ({
    width,
    signature,
    amount,
    date,
    status,
}: TransactionCardProps) => (
    <a
        href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
        target="_blank"
        rel="noreferrer"
    >
        <Card className="flex flex-row justify-between items-center gap-3 p-3 !rounded-lg hover:bg-opacity-[97%] transition-all duration-300">
            <div className="flex flex-row items-center gap-3 w-2/3">
                <Text
                    variant="sub-paragraph"
                    className="w-2/3 overflow-hidden text-ellipsis whitespace-nowrap text-base-content"
                >
                    {' '}
                    {signature}{' '}
                </Text>
                <Text variant="sub-paragraph" className="w-1/3 !text-primary">
                    {' '}
                    {amount}{' '}
                </Text>
            </div>
            <div className="flex flex-row items-center w-1/3 gap-3">
                <Text variant="label" className="w-1/2 text-secondary">
                    {' '}
                    {date}{' '}
                </Text>
                <div className="w-1/2 flex flex-row justify-center">
                    <div
                        className={cn(
                            'h-2 aspect-square rounded-full',
                            statuses[status],
                        )}
                    />
                </div>
            </div>
        </Card>
    </a>
);

export default TransactionCard;
