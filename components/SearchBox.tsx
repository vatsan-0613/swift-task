import React, { ChangeEvent } from 'react';
import { IoSearchOutline } from "react-icons/io5";

interface SearchBoxProps {
  searchTerm: string;
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ searchTerm, handleSearch }) => {
  return (
    <div className='flex md:mt-0 mt-5 items-center border-1 shadow-lg px-2 py-3 border-3 gap-3 border-2 w-60 rounded-md'>
      <IoSearchOutline />
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder='Search name, email, comment'
        className='text-xs outline-none'
      />
    </div>
  );
}

export default SearchBox;
