import { User as GithubUser, Issue, User } from 'types/github';

type IssueToCreate = {
    assignee: string;
    body: string;
    labels?: string[];
    title: string;
};

type SearchApiResponse = {
    items: [];
};

const DRILL_BOUNTY_LABEL = 'drill:bounty';
const DRILL_BOUNTY_ENABLED_LABEL = 'drill:bounty:enabled';
const DRILL_BOUNTY_CLOSED_LABEL = 'drill:bounty:closed';

const getDrillBountyUrlQuery = (params: string[] = []) =>
    `q=${encodeURIComponent(
        `is:issue label:"${DRILL_BOUNTY_ENABLED_LABEL}","${DRILL_BOUNTY_CLOSED_LABEL}" repo:${
            process.env.GITHUB_REPOSITORY
        } ${params.length ? params.join(' ') : ''}`,
    )}`;

const closeIssue = async (id: number, token: string) => {
    const url = `${process.env.GITHUB_API}/repos/${process.env.GITHUB_REPOSITORY}/issues/${id}`;

    try {
        const response = await fetch(url, {
            body: JSON.stringify({
                state: 'closed',
            }),
            headers: {
                Accept: 'application/vnd.github+json',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            method: 'PATCH',
        });

        return response.json();
    } catch (error) {
        throw new Error(error);
    }
};

const createIssue = async (issue: IssueToCreate, token: string) => {
    const url = `${process.env.GITHUB_API}/repos/${process.env.GITHUB_REPOSITORY}/issues`;
    const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');

    const { assignee, body, labels = [], title } = issue;

    try {
        const response = await fetch(url, {
            body: JSON.stringify({
                assignees: [assignee],
                body,
                labels: [DRILL_BOUNTY_LABEL, ...labels],
                owner,
                repo,
                title,
            }),
            headers: {
                Accept: 'application/vnd.github+json',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });

        return response.json();
    } catch (error) {
        throw new Error(error);
    }
};

const getGithubData = async <T>(url: string, token: string): Promise<T> => {
    try {
        const response = await fetch(
            url,
            token && { headers: { Authorization: `token ${token}` } },
        );

        if (response.status === 404) {
            return null;
        }

        return response.json();
    } catch (error) {
        throw new Error(error);
    }
};

const getIssues = async (accessToken: string): Promise<Issue[] | null> => {
    const query = getDrillBountyUrlQuery();
    const url = `${process.env.GITHUB_API}/search/issues?${query}`;

    const { items: issues } = await getGithubData<SearchApiResponse>(
        url,
        accessToken,
    );

    if (!issues.length) {
        return null;
    }

    return issues;
};

const getIssuesByAssignee = async (
    username: string,
    accessToken: string,
): Promise<Issue[] | null> => {
    const query = getDrillBountyUrlQuery([`assignee:${username}`]);
    const url = `${process.env.GITHUB_API}/search/issues?${query}`;

    const { items: issuesByAssignee } = await getGithubData<SearchApiResponse>(
        url,
        accessToken,
    );

    if (!issuesByAssignee) {
        return null;
    }

    return issuesByAssignee;
};

const getIssue = async (
    id: number,
    accessToken: string,
): Promise<Issue | null> => {
    const url = `${process.env.GITHUB_API}/repos/${process.env.GITHUB_REPOSITORY}/issues/${id}`;
    const issue = await getGithubData<Issue>(url, accessToken);

    if (!issue) {
        return null;
    }

    return issue;
};

const getUser = async (
    username: string,
    accessToken: string,
): Promise<User | null> => {
    const url = `${process.env.GITHUB_API}/users/${username}`;

    const user = await getGithubData<GithubUser>(url, accessToken);

    if (!user) {
        return null;
    }

    return user;
};

export {
    closeIssue,
    createIssue,
    getIssue,
    getIssues,
    getIssuesByAssignee,
    getUser,
    DRILL_BOUNTY_CLOSED_LABEL,
    DRILL_BOUNTY_ENABLED_LABEL,
};
