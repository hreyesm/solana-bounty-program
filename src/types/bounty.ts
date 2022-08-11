import { User } from './user';

type Bounty = {
    createdAt: string;
    description: string;
    githubUrl: string;
    hunter: User;
    id: number;
    name: string;
    owner: User;
    reward: number;
    state: 'open' | 'closed';
    tags: { value: string }[];
};

type BountyWithDetails = Bounty & { details: string };

export type { Bounty, BountyWithDetails };
