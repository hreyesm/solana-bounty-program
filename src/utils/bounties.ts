import { Bounty } from 'types/bounty';
import { DrillResponse } from 'types/drill';
import { Issue } from 'types/github';
import { formatDate } from 'utils';

/**
 * Returns `true` if the `name` attribute of the provided Bounty matches the
 * search query.
 *
 * @param bounty Bounty to filter.
 * @param rawQuery Query before unformatting.
 */
const filterBounties = ({ name }: Bounty, rawQuery: string) => {
    const unformat = (str: string) => str.toLowerCase();
    const query = unformat(rawQuery);

    return unformat(name).includes(query);
};

/**
 * Converts a GitHub issue (fetched from the GitHub API) into a Bounty object.
 *
 * @param issue GitHub issue.
 */
const toBounty = (issueWithDrillResponse: Issue & DrillResponse): Bounty => {
    const { amount, created_at, body, html_url, labels, number, state, title } =
        issueWithDrillResponse;

    const reward = Number(amount) / 1_000_000;

    return {
        createdAt: formatDate(created_at),
        description: body,
        githubUrl: html_url,
        id: number,
        name: title,
        reward,
        state,
        tags: labels.map(label => ({ value: label.name })),
    };
};

/**
 * Returns a list of GitHub issues (fetched from the GitHub API) converted to
 * Bounty objects.
 *
 * @param issues GitHub issues.
 */
const toBountyList = (
    issuesWithDrillResponse: (Issue & DrillResponse)[],
): Bounty[] => issuesWithDrillResponse.map(issue => toBounty(issue));

export { filterBounties, toBounty, toBountyList };
