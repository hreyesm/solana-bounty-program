import { Bounty, BountyWithDrillInfo } from 'types/bounty';
import { User as GithubUser, Issue } from 'types/github';
import { toBounty, toBountyList } from 'utils/bounties';

import { GetServerSidePropsContext } from 'next';
import { User } from 'types/user';
import { getSession } from 'next-auth/react';

const DRILL_BOUNTY_LABEL_ENABLED = 'drill:bounty:enabled';
const DRILL_BOUNTY_LABEL_CLOSED = 'drill:bounty:closed';

type SearchApiResponse = {
    items: [];
};

const fetchGithubData = async <T>(url: string, token: string): Promise<T> => {
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

const getBounties = async (
    context: GetServerSidePropsContext,
): Promise<Bounty[]> => {
    const queryString = `q=${encodeURIComponent(
        `is:issue label:"${DRILL_BOUNTY_LABEL_ENABLED}","${DRILL_BOUNTY_LABEL_CLOSED}" repo:${process.env.GITHUB_REPOSITORY}`,
    )}`;

    const url = `${process.env.GITHUB_API}/search/issues?${queryString}`;

    const session = await getSession(context);
    const token = session?.accessToken as string;

    const { items: issues } = await fetchGithubData<SearchApiResponse>(
        url,
        token,
    );

    if (!issues) {
        return null;
    }

    return toBountyList(issues);
};

const getBountiesByAsignee = async (
    context: GetServerSidePropsContext,
): Promise<Bounty[]> => {
    const queryString = `q=${encodeURIComponent(
        `assignee:${context.query.username} is:issue label:"${DRILL_BOUNTY_LABEL_ENABLED}","${DRILL_BOUNTY_LABEL_CLOSED}" repo:${process.env.GITHUB_REPOSITORY}`,
    )}`;

    const url = `${process.env.GITHUB_API}/search/issues?${queryString}`;

    const session = await getSession(context);
    const token = session?.accessToken as string;

    const { items: issues } = await fetchGithubData<SearchApiResponse>(
        url,
        token,
    );

    if (!issues) {
        return null;
    }

    return toBountyList(issues);
};

const getBountyWithDrillInfo = async (
    context: GetServerSidePropsContext,
): Promise<BountyWithDrillInfo | null> => {
    const session = await getSession(context);
    const token = session?.accessToken as string;

    // Get GitHub issue (/issues/[number])
    const issueNumber = context.query.bounty;
    const issueUrl = `${process.env.GITHUB_API}/repos/${process.env.GITHUB_REPOSITORY}/issues/${issueNumber}`;
    const issue = await fetchGithubData<Issue>(issueUrl, token);

    if (!issue) {
        return null;
    }

    // Get Markdown of first comment on GitHub issue, i.e., Drill info
    // (/issues/[number]/comments)
    const issueCommentsUrl = `${issueUrl}/comments`;
    const issueComments = await fetchGithubData<Issue[]>(
        issueCommentsUrl,
        token,
    );
    const mdDrillInfo = issueComments[0].body;

    return { ...toBounty(issue), mdDrillInfo };
};

const getUser = async (context: GetServerSidePropsContext): Promise<User> => {
    const url = `${process.env.GITHUB_API}/users/${context.query.username}`;

    const session = await getSession(context);
    const token = session?.accessToken as string;
    const login = session?.login as string;

    const githubUser = await fetchGithubData<GithubUser>(url, token);

    if (!githubUser) {
        return null;
    }

    const {
        avatar_url: avatarUrl,
        name: fullName,
        login: username,
    } = githubUser;

    return {
        avatarUrl,
        fullName,
        isCurrentUser: login === context.query.username,
        username,
    };
};

export { getBounties, getBountiesByAsignee, getBountyWithDrillInfo, getUser };
