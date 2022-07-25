export type Bounty = {
    createdAt: string;
    name: string;
    reward: number;
    tags: { value: string }[];
    // TODO: Add owner and hunter props
};
