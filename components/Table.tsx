import React from 'react'

interface Comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

type CommentsArray = Comment[];

interface ButtonProps {
    name: string;
    // age: number;
    // isAdmin?: boolean; // Optional prop
    // onClick: (event: React.MouseEvent<HTMLButtonElement>) => void; // Function prop
}

const Table:React.FC<{comments : CommentsArray}> = ({comments}) => {
  return (
    <table className='w-full table-auto'>
        <thead className=''>
            <tr className='bg-button-color'>
                <td className='py-3 px-4 font-semibold'>PostID</td>
                <td  className='py-3 px-4  font-semibold'>Name</td>
                <td className='py-3 px-4 font-semibold'>Email</td>
                <td className='py-3 px-4 font-semibold'>Comments</td>
            </tr>
        </thead>
        <tbody>
        {
            comments && comments.map((comment, ind) => {
                return(
                    <tr className='shadow-sm' key={ind}>
                        <td className='py-3 px-4  text-sm'>{comment.id}</td>
                        <td className='py-3 px-4 text-sm'>{comment.name}</td>
                        <td className='py-3 px-4 text-sm'>{comment.email}</td>
                        <td className='py-3 px-4 text-sm'>{comment.body}</td>
                    </tr>
                )
            })
        }
        </tbody>
    </table>
  )
}

export default Table