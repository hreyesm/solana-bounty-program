import { NextApiHandler } from 'next';
import { authOptions } from '../auth/[...nextauth]';
import { getBounties } from 'lib/bounties';
import { unstable_getServerSession } from 'next-auth';

const handler: NextApiHandler = async (req, res) => {
    const session = await unstable_getServerSession(req, res, authOptions);
    const accessToken = session?.accessToken as string;

    const bounties = await getBounties(accessToken);

    return res.status(200).json(bounties);
};

export default handler;
