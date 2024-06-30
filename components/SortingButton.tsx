import React from 'react'
import { FaSort, FaSortAlphaDown, FaSortAlphaDownAlt } from "react-icons/fa";


interface ButtonProps {
    name: string;
    handleSort: (type: string) => void;
    sortType: string | null;
    sortOrder: 'asc' | 'desc' | null
}


const SortingButton: React.FC<ButtonProps> = ({ name, handleSort, sortType, sortOrder }) => {
    console.log(sortType + " " + name);
    return (
        <button onClick={() => handleSort(name)} className='flex justify-between items-center gap-3 border-2 px-3 py-2 bg-button-color hover:bg-primary-color hover:text-white rounded-md'>
            <div className='text-sm'>Sort {name}</div>
            {
                name === sortType ? (
                    sortOrder === 'asc' ? <FaSortAlphaDown /> : (sortOrder === 'desc' ? <FaSortAlphaDownAlt /> : <FaSort />)
                ):
                <FaSort />
            }
        </button>
    )
}

export default SortingButton