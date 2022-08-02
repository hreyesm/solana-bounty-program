type Bounty = {
    // TODO: Add owner and hunter props
    createdAt: string;
    githubUrl: string;
    id: number;
    mdDescription: string;
    name: string;
    reward: number;
    tags: { value: string }[];
};

type BountyWithDrillInfo = Bounty & { mdDrillInfo: string };

export type { Bounty, BountyWithDrillInfo };
