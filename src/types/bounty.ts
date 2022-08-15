export type Bounty = {
    address: string;
    createdAt: string;
    description: string;
    githubUrl: string;
    hunter?: string;
    id: number;
    name: string;
    owner: string;
    reward: number;
    state: 'open' | 'closed';
    tags: { value: string }[];
};
