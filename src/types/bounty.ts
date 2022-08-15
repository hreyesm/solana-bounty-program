export type Bounty = {
    address: string;
    createdAt: string;
    description: string;
    githubUrl: string;
    hunter?: string;
    id: number;
    mint?: string;
    name: string;
    owner: string;
    reward: number;
    state: 'open' | 'closed';
    tags: { value: string }[];
};
