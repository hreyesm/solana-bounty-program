import Text from "components/common/text";
import { useSession } from "next-auth/react";
import { MdPerson, MdPersonOutline } from "react-icons/md";
import { BsMarkdown } from "react-icons/bs";
import NavElement from "components/common/layout/header/nav-element";
import { useRouter } from "next/router";
import Card from "components/common/card";

const NewPage = () => {
    const router = useRouter();
    const currentTabId = (router.query.tab as string) || "write";

    const { data: session } = useSession();

    if (!session) {
        return <Text variant="paragraph"> You must be logged in to create a bounty </Text>;
    }

    return (
        <div className="flex flex-col">
            <section
                title="bounty-name"
                className="flex w-full flex-col gap-7 bg-gradient-to-tr from-primary/75 to-secondary/75 p-5 text-white sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20"
            >
                <Text variant="label">New bounty</Text>
                <div className="flex flex-col justify-between h-20">
                    <input className="peer placeholder-line/50 bg-transparent outline-none border-none text-4xl font-medium md:text-6xl" placeholder="Bounty name..." />
                    <div className="w-full h-px bg-line peer-focus:h-1 peer-focus:bg-white transition-all duration-300" />
                </div>
            </section>
            <section 
                title="bounty-details"
                className="flex w-full flex-col gap-7 p-5 text-white sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20 !pb-0"
            >
                <Text variant="label">Details</Text>
                <div className="flex flex-col gap-3">
                    <Text variant="heading">Hunter</Text>
                    <Text variant="label" className="text-secondary !normal-case"> Enter a valid username for the GitHub user you wish to assign this bounty to... </Text>
                    <div className="background-transparent group flex h-11 w-96 min-w-fit flex-row items-center gap-3 rounded-full border border-white px-5 py-3 text-white">
                        <MdPersonOutline size={20} />
                        <input
                            className="w-28 bg-transparent text-sm tracking-wide text-secondary outline-none valid:text-primary"
                            placeholder="Enter user..."
                            type="text"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-row items-center justify-between">
                        <Text variant="heading"> Description </Text>
                        <div
                            className="tooltip"
                            data-tip="The textbox below supports Markdown"
                        >
                            <BsMarkdown size={20} />
                        </div>
                    </div>

                    <div className="sticky top-20 z-30 -mt-px flex h-16 flex-row gap-8 border-b-1.5 border-b-line bg-black bg-opacity-40 pt-4 backdrop-blur-xl">
                        <NavElement
                            as={`/explorer/new`}
                            href={`/explorer/new?tab=write`}
                            key={"write"}
                            label={"Write"}
                            scroll={false} // TODO: Scroll to navbar position.
                        />
                        <div className="tooltip" data-tip="This feature is still in development">
                            <NavElement
                                href={`/explorer/new?tab=preview`}
                                key={"preview"}
                                label={"Preview"}
                                scroll={false} // TODO: Scroll to navbar position.
                                disabled={true}
                            />
                        </div>
                    </div>

                    <Card className="w-full h-fit p-5 focus-within:border-primary focus-within:border-3 transition-all duration-300">
                        <textarea 
                            className="w-full min-h-[15rem] bg-transparent outline-none border-none"
                            placeholder="Enter description..."
                        />
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default NewPage;