import {
    MdExpandMore,
    MdOutlineCategory,
    MdOutlineSearch,
    MdSort,
} from 'react-icons/md';

import { ChangeEvent } from 'react';

type FilterMenuProps = {
    onSearchInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const FilterMenu = ({ onSearchInputChange }: FilterMenuProps) => (
    <>
        <div className="background-transparent group flex h-11 w-full flex-row items-center gap-3 rounded-full border border-white px-5 py-3 text-white md:w-fit">
            <MdOutlineSearch size={20} />
            <input
                className="bg-transparent text-sm tracking-wide text-secondary outline-none"
                onChange={onSearchInputChange}
                placeholder="Filter bounties..."
                type="text"
            />
        </div>
    </>
);

export default FilterMenu;
