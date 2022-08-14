import { FormEvent, useMemo, useState } from 'react';

import { BsMarkdown } from 'react-icons/bs';
import Button from 'components/common/button';
import Card from 'components/common/card';
import Markdown from 'components/common/markdown';
import { MdPersonOutline } from 'react-icons/md';
import NavElement from 'components/common/layout/header/nav-element';
import Text from 'components/common/text';
import { cn } from 'utils';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const NewPage = () => {
    const validBountyName = false;
    const validHunter = false;

    const { data: session } = useSession();

    const [title, setTitle] = useState('');
    const [hunter, setHunter] = useState('');
    const [description, setDescription] = useState('');

    const tabs = useMemo(
        () => [
            {
                content: (
                    <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                        <textarea
                            className="min-h-[15rem] w-full border-none bg-transparent outline-none"
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Enter description..."
                            value={description}
                        />
                    </Card>
                ),
                id: 'write',
                label: 'Write',
            },
            {
                content: <Markdown>{description}</Markdown>,
                id: 'preview',
                label: 'Preview',
            },
        ],
        [description],
    );

    const router = useRouter();
    const currentTabId = (router.query.tab as string) || 'write';

    const currentTab = useMemo(
        () => tabs.find(tab => tab.id === currentTabId),
        [currentTabId, tabs],
    );

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/bounties', {
                body: JSON.stringify({
                    assignee: hunter,
                    body: description,
                    title: title,
                }),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
            });

            const data = await response.json();

            if (response.ok) {
                router.push('/explorer');
            } else {
                alert(JSON.stringify(data));
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    if (!session) {
        return <Text variant="paragraph"></Text>;
    }

    return (
        <form className="flex flex-col" onSubmit={onSubmit}>
            <section
                title="bounty-name"
                className="flex w-full flex-col gap-7 bg-gradient-to-tr from-primary/75 to-secondary/75 p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20"
            >
                <Text variant="label">New bounty</Text>
                <div
                    className={cn(
                        'tooltip-bottom tooltip-error',
                        !validBountyName && 'tooltip-open tooltip',
                    )}
                    data-tip="Enter a bounty name"
                >
                    <div className="flex h-12 flex-col justify-between md:h-20">
                        <input
                            className="peer border-none bg-transparent text-4xl font-medium placeholder-black/20 outline-none md:text-6xl"
                            onChange={e => setTitle(e.target.value)}
                            placeholder="Bounty name..."
                            value={title}
                        />
                        <div className="h-px w-full bg-line transition-all duration-300 peer-focus:h-1 peer-focus:bg-white" />
                    </div>
                </div>
            </section>
            <section
                title="bounty-details"
                className="flex w-full flex-col gap-7 p-5 !pb-0 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20"
            >
                <Text variant="label">Details</Text>
                <div className="flex flex-col gap-3">
                    <Text variant="heading">Hunter</Text>
                    <Text
                        variant="label"
                        className="!normal-case text-secondary"
                    >
                        {' '}
                        Enter a valid username for the GitHub user you wish to
                        assign this bounty to...{' '}
                    </Text>
                    <div
                        className={cn(
                            'tooltip-error w-fit',
                            !validHunter && 'tooltip-open tooltip',
                        )}
                        data-tip="Enter a valid GitHub username"
                    >
                        <div className="background-transparent group flex h-11 w-96 min-w-fit flex-row items-center gap-3 rounded-full border border-white px-5 py-3">
                            <MdPersonOutline size={20} />
                            <input
                                className="w-28 max-w-full bg-transparent text-sm tracking-wide text-secondary outline-none valid:text-primary"
                                onChange={e => setHunter(e.target.value)}
                                placeholder="Enter user..."
                                type="text"
                                value={hunter}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-row items-center justify-between">
                        <Text variant="heading">Description</Text>
                        <div
                            className="tooltip"
                            data-tip="The textbox below supports Markdown"
                        >
                            <BsMarkdown size={20} />
                        </div>
                    </div>

                    <div className="sticky top-20 z-30 -mt-px flex h-16 flex-row gap-8 border-b-1.5 border-b-line bg-black bg-opacity-40 pt-4 backdrop-blur-xl">
                        {tabs.map((tab, index) => (
                            <NavElement
                                as={index === 0 && '/explorer/new'}
                                href={`/explorer/new?tab=${tab.id}`}
                                key={tab.id}
                                label={tab.label}
                                scroll={false} // TODO: Scroll to navbar position.
                            />
                        ))}
                    </div>

                    {currentTab.content}

                    <div className="width-full flex flex-row justify-end">
                        <Button
                            disabled={!title || !hunter}
                            type="submit"
                            variant="orange"
                            text="Create"
                        />
                    </div>
                </div>
            </section>
        </form>
    );
};

export default NewPage;
