"use client";

import { IPost } from "@/lib/types"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import Link from "next/link"
import { Button } from "../ui/button"
import CreatePost from "./CreatePost"
import { useState } from "react"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface IProps{
    data:IPost[]
}

const PostTable = ({data}:IProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Adjust the number of items per page as needed
    const totalPages = Math.ceil(data?.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const currentItems = data?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
   <div>
    <div className="flex justify-end px-5 mb-5">
        <CreatePost/>
    </div>
     <div className="max-w-4xl px-[4rem]">
        <Table>
  <TableCaption>A list of posts</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Id</TableHead>
      <TableHead>UserId</TableHead>
      <TableHead>Title</TableHead>
      <TableHead>Body</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {
        currentItems?.length > 0 ? (
            currentItems?.map(item=>{
                return (
                    <TableRow key={item?.id}>
      <TableCell className="font-medium">{item?.id}</TableCell>
      <TableCell>{item?.userId}</TableCell>
      <TableCell>{item?.title}</TableCell>
      <TableCell>{item?.body}</TableCell>
      <TableCell className="text-right">
        <Link href={`/posts/${item?.id}`}>
            <Button variant={"ghost"}>Edit</Button>
        </Link>
      </TableCell>
    </TableRow>
                )
            })
        ):(
            <TableRow>
      <TableCell className="font-medium">No Items Found</TableCell>
      </TableRow>
        )
    }
  </TableBody>
</Table>
<div className="mt-5 p-5">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                                />
                            </PaginationItem>
                            {[...Array(totalPages)].map((_, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        href="#"
                                        isActive={currentPage === index + 1}
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>

    </div>
   </div>
  )
}

export default PostTable