import { User as GithubUser, Issue } from 'types/github';

import { Bounty } from 'types/bounty';
import { GetServerSidePropsContext } from 'next';
import { URLSearchParams } from 'url';
import { User } from 'types/user';
import { getSession } from 'next-auth/react';
import { toBountyList } from 'utils/bounties';

type SearchApiResponse = {
    items: [];
};

const fetchGithubData = async <T>(url: string, token: string): Promise<T> => {
    try {
        const response = await fetch(
            url,
            token && { headers: { Authorization: `token ${token}` } },
        );

        return response.json();
    } catch (error) {
        throw new Error(error);
    }
};

const getBounties = async (
    context: GetServerSidePropsContext,
    options?: Record<string, unknown>,
): Promise<Bounty[]> => {
    const params = { labels: 'drill:bounty:enabled', state: 'all', ...options };

    const url = `${process.env.GITHUB_API}/repos/${
        process.env.GITHUB_REPOSITORY
    }/issues?${new URLSearchParams(params).toString()}`;

    const session = await getSession(context);
    const token = session?.accessToken as string;

    const issues = await fetchGithubData<Issue[]>(url, token);

    return toBountyList(issues);
};

const getBountiesByAsignee = async (
    context: GetServerSidePropsContext,
): Promise<Bounty[]> => {
    const queryString = `q=${encodeURIComponent(
        `assignee:${context.query.username} is:issue label:"drill:bounty:enabled" repo:${process.env.GITHUB_REPOSITORY}`,
    )}`;

    const url = `${process.env.GITHUB_API}/search/issues?${queryString}`;

    const session = await getSession(context);
    const token = session?.accessToken as string;

    const { items: issues } = await fetchGithubData<SearchApiResponse>(
        url,
        token,
    );

    return toBountyList(issues);
};

const getUser = async (context: GetServerSidePropsContext): Promise<User> => {
    const url = `${process.env.GITHUB_API}/users/${context.query.username}`;

    const session = await getSession(context);
    const token = session?.accessToken as string;
    const login = session?.login as string;

    const {
        avatar_url: avatarUrl,
        name: fullName,
        login: username,
    } = await fetchGithubData<GithubUser>(url, token);

    return {
        avatarUrl,
        fullName,
        isCurrentUser: login === context.query.username,
        username,
    };
};

export { getBounties, getBountiesByAsignee, getUser };
