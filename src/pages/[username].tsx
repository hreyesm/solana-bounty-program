import { GetServerSideProps, NextPage } from 'next';
import { getBountiesByAsignee, getUser } from 'lib/github';

import { Bounty } from 'types/bounty';
import BountyList from 'components/common/bounty-list';
import Hero from 'components/profile-page/hero';
import Text from 'components/common/text';
import { User } from 'types/user';

type ProfilePageProps = {
    bounties: Bounty[];
    user: User;
};

const ProfilePage: NextPage<ProfilePageProps> = ({ bounties, user }) => {
    const { fullName, isCurrentUser, username } = user;
    const firstName = fullName ? fullName.split(' ')[0] : username;
    const bountyListTitlePronoun = isCurrentUser ? 'My' : `${firstName}'s`;

    return (
        <div className="mt-8">
            <div className="flex flex-col gap-16 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48">
                <Hero {...user} />
                <div className="flex flex-col gap-7">
                    <Text className="text-white" variant="sub-heading">
                        {bountyListTitlePronoun} Bounties
                    </Text>
                    <BountyList bounties={bounties} />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

export const getServerSideProps: GetServerSideProps = async context => {
    const user = await getUser(context);
    const bounties = await getBountiesByAsignee(context);

    if (!user) {
        return { notFound: true };
    }

    return {
        props: { bounties, user },
    };
};
