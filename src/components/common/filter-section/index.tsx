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
    <div className="flex justify-end w-full">
        <div className="group flex flex-row items-center gap-3 h-11 px-5 py-3 rounded-full border border-white background-transparent w-full md:w-fit">
            <MdOutlineSearch size={20} />
            <input
                className="outline-none bg-transparent text-sm tracking-wide text-secondary"
                onChange={onSearchInputChange}
                placeholder="Filter bounties..."
                type="text"
            />
        </div>
    </div>
);

export default FilterMenu;
