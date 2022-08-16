import { getIssue, getIssues, getIssuesByAssignee } from './github';
import {
    toBounty,
    toBountyList,
} from 'utils/bounties';

import { getDrillResponse } from './drill';

const getBounties = async (accessToken: string) => {
    const issues = await getIssues(accessToken);

    if (!issues) {
        return null;
    }

    // const drillResponses = await getDrillResponsesFromIssues(issues);

    // if (!drillResponses) {
    //     return null;
    // }

    return toBountyList(issues, []);
};

const getBountiesByAssignee = async (username: string, accessToken: string) => {
    const issuesByAssignee = await getIssuesByAssignee(username, accessToken);

    if (!issuesByAssignee) {
        return null;
    }

    // const drillResponses = await getDrillResponsesFromIssues(issuesByAssignee);

    // if (!drillResponses) {
    //     return null;
    // }

    return toBountyList(issuesByAssignee, []);
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

const getBountyReward = async (id: number) => {
    const drillResponse = await getDrillResponse(id);

    if (!drillResponse) {
        return null;
    }

    return Number(drillResponse.amount) / 1_000_000;
};

export { getBounty, getBountyReward, getBounties, getBountiesByAssignee };
