import React from 'react';
import Text from 'components/common/text';
import { VscGithubAlt } from 'react-icons/vsc';
import { BiWalletAlt } from 'react-icons/bi';

export function Menu(props) {
    return (
        <ul
            tabIndex={0}
            className={"dropdown-content menu rounded-box z-50 mt-6 w-screen bg-base shadow md:w-52 text-white " + props.className}
        >
            <li>
                <div className="flex justify-between">
                    <div>
                        <Text variant="label" className="opacity-50">
                            Profile
                        </Text>
                        <br />
                        <p>Login with GitHub</p>
                    </div>
                    <VscGithubAlt size={25} />
                </div>
            </li>
            <hr className="w-full opacity-50" />
            <li>
                <div className="flex justify-between">
                    <div>
                        <Text variant="label" className="opacity-50">
                            Wallet
                        </Text>
                        <br />
                        {/* Here will be the wallet connection button */}
                        <p>Connect</p>
                    </div>
                    <BiWalletAlt size={25} />
                </div>
            </li>
        </ul>
    );
}
