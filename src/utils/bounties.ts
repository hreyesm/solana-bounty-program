import { Bounty } from 'types/bounty';
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
const toBounty = ({
    body: mdDescription,
    created_at: createdAt,
    number,
    labels,
    state,
    title: name,
    html_url: githubUrl,
}: Issue): Bounty => ({
    createdAt: formatDate(createdAt),
    id: number,
    githubUrl,
    mdDescription,
    name,
    reward: 0,
    state,
    tags: labels.map(label => ({ value: label.name })),
});

/**
 * Returns a list of GitHub issues (fetched from the GitHub API) converted to
 * Bounty objects.
 *
 * @param issues GitHub issues.
 */
const toBountyList = (issues: Issue[]): Bounty[] =>
    issues.map(issue => toBounty(issue));

export { toBounty, toBountyList, filterBounties };
