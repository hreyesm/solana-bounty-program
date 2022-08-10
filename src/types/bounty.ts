type Bounty = {
    // TODO: Add owner and hunter props
    createdAt: string;
    description: string;
    githubUrl: string;
    id: number;
    name: string;
    reward: number;
    state: 'open' | 'closed';
    tags: { value: string }[];
};

type BountyWithDetails = Bounty & { details: string };

export type { Bounty, BountyWithDetails };
