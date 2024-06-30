'use client';
import SortingButton from "@/components/SortingButton";
import SearchBox from "@/components/SearchBox";
import { useEffect, useState, ChangeEvent } from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import Table from "@/components/Table";
import { getLocalStorage, setLocalStorage } from "@/utils/retainer";

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

type CommentsArray = Comment[];

export default function Home() {

  const [tableData, setTableData] = useState<CommentsArray>([]);
  const [recordsPerPage, setRecordsPerPage] = useState<number>(() => getLocalStorage('recordsPerPage', 10));
  const [page, setPage] = useState<number>(() => getLocalStorage('page', 1));
  const [sortType, setSortType] = useState<string | null>(() => getLocalStorage('sortType', null));
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(() => getLocalStorage('sortOrder', null));

  const handleSort = (type: string) => {
    if (sortType === type) {
      setSortOrder(prevOrder => {
        const newOrder = prevOrder === 'asc' ? 'desc' : prevOrder === 'desc' ? null : 'asc';
        setLocalStorage('sortOrder', newOrder);
        return newOrder;
      });
    } else {
      setSortType(type);
      setSortOrder('asc');
      setLocalStorage('sortType', type);
      setLocalStorage('sortOrder', 'asc');
    }
  };

  useEffect(() => {
    const fetchComments = async() => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/comments"); 
        const comments = await response.json();
        setTableData(comments);
      } catch(error) {
        console.log("Error fetching data " + error);
      }
    };

    fetchComments();
  }, []);

  useEffect(() => {
    setLocalStorage('recordsPerPage', recordsPerPage);
  }, [recordsPerPage]);

  useEffect(() => {
    setLocalStorage('page', page);
  }, [page]);

  useEffect(() => {
    setLocalStorage('sortType', sortType);
    setLocalStorage('sortOrder', sortOrder);
  }, [sortType, sortOrder]);

  const sortedData = [...tableData].sort((a, b) => {
    if (!sortType || !sortOrder) return 0;

    if (sortType === 'name') {
      const compare = a.name.localeCompare(b.name);
      return sortOrder === 'asc' ? compare : -compare;
    }

    if (sortType === 'postId') {
      return sortOrder === 'asc' ? a.postId - b.postId : b.postId - a.postId;
    }

    if (sortType === 'email') {
      const compare = a.email.localeCompare(b.email);
      return sortOrder === 'asc' ? compare : -compare;
    }

    return 0;
  });

  const buttons = [
    { name: "postId" },
    { name: "name" },
    { name: "email" }
  ];

  const handleRecordsPerPage = (event: ChangeEvent<HTMLSelectElement>) => {
    setRecordsPerPage(parseInt(event.target.value));
  };

  const toggleNextPage = () => {
    if (page === Math.ceil(sortedData.length / recordsPerPage)) return;
    setPage(prev => prev + 1);
  };

  const togglePreviousPage = () => {
    if (page === 1) return;
    setPage(prev => prev - 1);
  };

  return (
    <main>
      <main className="mt-10 mb-10">
        <div className="grid md:grid-cols-2 grid-cols-1 px-[8%] ">
          <div className="flex gap-3">
            {buttons.map(button => (
              <SortingButton
                name={button.name}
                key={button.name}
                handleSort={handleSort}
                sortType={sortType}
                sortOrder={sortOrder}
              />
            ))}
          </div>
          <div className="flex justify-end">
            <SearchBox />
          </div>
        </div>
        <div className="mt-7 rounded-md mb-5 overflow-x-scroll md:overflow-auto md:w-[84%] w-full mx-auto">
          <Table
            comments={sortedData.slice((page - 1) * recordsPerPage, (page - 1) * recordsPerPage + recordsPerPage)}
          />
        </div>
        <div className="flex justify-end items-center gap-3 sm:px-[5%] px-[8%]">
          <div className="text-xs">
            {(page - 1) * recordsPerPage + 1} to {(page - 1) * recordsPerPage + recordsPerPage} of {sortedData.length}
          </div>
          <div className="flex gap-3">
            <button className="border-2 rounded-md" onClick={togglePreviousPage}>
              <GrFormPrevious /> 
            </button>
            <button className="border-2 rounded-md" onClick={toggleNextPage}>
              <GrFormNext />
            </button>
          </div>
          <select
            name="RecordsPerPage"
            id="RecordsPerPage"
            className="text-xs p-2 border-2 outline-none"
            onChange={handleRecordsPerPage}
            value={recordsPerPage}
          >
            <option value="10" className="text-xs">10 / page</option>
            <option value="50" className="text-xs">50 / page</option>
            <option value="100" className="text-xs">100 / page</option>
          </select>
        </div>
      </main>
    </main>
  );
}
