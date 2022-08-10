type Issue = {
    assignee?: User;
    body?: string;
    created_at: string;
    html_url: string;
    id: number;
    labels: { name: string }[];
    number: number;
    title: string;
    state: 'open' | 'closed';
    user: User;
};

type IssueWithDetails = Issue & { details: string };

type User = {
    avatar_url: string;
    login: string;
    name: string;
};

export type { Issue, IssueWithDetails, User };
