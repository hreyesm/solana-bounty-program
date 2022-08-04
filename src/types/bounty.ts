export type Bounty = {
    createdAt: string;
    githubUrl: string;
    id: number;
    name: string;
    reward: number;
    tags: { value: string }[];
    // TODO: Add owner and hunter props
};
