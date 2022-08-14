/* eslint-disable indent */
import { NextApiHandler } from 'next';
import { authOptions } from '../auth/[...nextauth]';
import { createIssue } from 'lib/github';
import { getBounties } from 'lib/bounties';
import { unstable_getServerSession } from 'next-auth';

const handler: NextApiHandler = async (req, res) => {
    const session = await unstable_getServerSession(req, res, authOptions);
    const accessToken = session?.accessToken as string;

    switch (req.method) {
        // GET /api/bounties
        case 'GET': {
            const bounties = await getBounties(accessToken);
            res.status(200).json(bounties);
            break;
        }
        // POST /api/bounties
        case 'POST': {
            const response = await createIssue(req.body, accessToken);

            if (response.message === 'Validation Failed') {
                const {
                    errors: [error],
                } = response;

                return res.status(500).json(error);
            }

            res.status(200).json(response);
            break;
        }
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} not allowed`);
    }
};

export default handler;
