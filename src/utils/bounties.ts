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
 * Returns a list of issues (fetched from the GitHub API) converted to
 * Bounties.
 *
 * @param issues GitHub issues.
 */
const toBountyList = (issues: Issue[]): Bounty[] =>
    issues.map(
        ({
            created_at: createdAt,
            labels,
            title: name,
            html_url: githubUrl,
        }) => ({
            createdAt: formatDate(createdAt),
            githubUrl,
            name,
            reward: 0,
            tags: labels.map(label => ({ value: label.name })),
        }),
    );

export { toBountyList, filterBounties };
