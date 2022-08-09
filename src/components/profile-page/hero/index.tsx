/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { MdInfo, MdInfoOutline, MdLink, MdOutlineEdit, MdOutlineSettings } from 'react-icons/md';
import { User } from 'types/user';
import Text from 'components/common/text';
import Button from 'components/common/button';
import Image from 'components/common/image';
import Chip from 'components/common/chip';

type HeroProps = User & {
    isCurrentUser: boolean;
};

const Hero = ({ avatarUrl, fullName, isCurrentUser, username }: HeroProps) => (
    <div className="flex flex-col">
        <div className="h-60 w-full bg-gradient-to-tr from-primary/75 to-secondary/75" />
        <div className="flex flex-row flex-wrap justify-between md:items-center gap-4 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-10">
                <Image
                    alt="avatar"
                    className="flex -mt-16 aspect-square h-32 w-max rounded-full md:h-36 md:-mt-18"
                    src={avatarUrl}
                    style={{ borderRadius: '50%' }}
                />
                <div className="flex flex-wrap flex-row items-center gap-5">
                    <div className="flex flex-col gap-1 text-white">
                        <Text variant="heading">
                            {fullName}
                        </Text>
                        <div className="flex flex-row items-center gap-2">
                            <Text variant="paragraph" className="text-primary">
                                <a href={`https://github.com/${username}`}>
                                    {username}
                                </a>
                            </Text>
                            {!isCurrentUser && (
                                <Chip value="Level" highlightValue="3" reversed={true} />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {isCurrentUser && (
                <div className="flex flex-row items-center gap-5">
                    <div className="flex flex-col gap-2 h-full w-52">
                        <div className="flex flex-row justify-between items-center">
                            <Chip value="Level" highlightValue="3" reversed={true} />
                            <Text variant="label" className="flex flex-row items-center gap-1 text-secondary !normal-case">
                                To next: <span className="text-danger font-medium"> 4 </span> 

                                <div className="tooltip" data-tip="Complete bounties to earn levels">
                                    <MdInfoOutline size={15} className="aspect-square" />
                                </div>
                            </Text>
                        </div>
                        <progress className="progress progress-error bg-base/75" value="60" max="100" />
                    </div>
                    <Button icon={MdOutlineEdit} variant="orange" className="mt-3 md:mt-0" />
                </div>
            )}
        </div>
    </div>
);

export default Hero;
