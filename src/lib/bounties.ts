import {
    getDrillResponsesFromIssues,
    toBounty,
    toBountyList,
} from 'utils/bounties';
import { getIssue, getIssues, getIssuesByAssignee } from './github';

import { getDrillResponse } from './drill';

const getBounties = async (accessToken: string) => {
    const issues = await getIssues(accessToken);

    if (!issues) {
        return null;
    }

    const drillResponses = await getDrillResponsesFromIssues(issues);

    if (!drillResponses) {
        return null;
    }

    return toBountyList(issues, drillResponses);
};

const getBountiesByAssignee = async (username: string, accessToken: string) => {
    const issuesByAssignee = await getIssuesByAssignee(username, accessToken);

    if (!issuesByAssignee) {
        return null;
    }

    const drillResponses = await getDrillResponsesFromIssues(issuesByAssignee);

    if (!drillResponses) {
        return null;
    }

    return toBountyList(issuesByAssignee, drillResponses);
};

const getBounty = async (id: number, accessToken: string) => {
    const issue = await getIssue(id, accessToken);

    if (!issue) {
        return null;
    }

    const drillResponse = await getDrillResponse(id);

    if (!drillResponse) {
        return null;
    }

    return toBounty(issue, drillResponse);
};

export { getBounty, getBounties, getBountiesByAssignee };
