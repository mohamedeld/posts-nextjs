"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { IPost } from "@/lib/types";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";


interface IProps {
    post:IPost
}

const DeletePost = ({post}:IProps) => {
    const {toast} = useToast();
    const router = useRouter();
    const [loading,setLoading] = useState(false);
    if(!post?.id){
        redirect("/")
    }
  

  async function handleDelete(){
    setLoading(true)
    try{
        const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${post?.id}`);
            toast({
                title: 'Post has been deleted successfully',
                description: `Deleted`,
            });
            router.push("/")
            setLoading(false)
    }catch(error){
        console.log(error)
        toast({
            title: 'error on delete Post',
            description: `${error instanceof Error ? error?.message : 'Something went wrong'}`,
        });
        setLoading(false)
    }
  }
  return (
    <Dialog>
      <DialogTrigger>
        <Button type="button" variant={"destructive"}>Delete Post</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Post</DialogTitle>
          <DialogDescription>Do you want to delete this post</DialogDescription>
        </DialogHeader>
        <Button variant={"destructive"} onClick={()=>handleDelete()}>{
            loading ? (
                <>
                    <Loader2 className="animate-spin" />
                    Please wait
                    </>
            ):("Delete")
}</Button>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePost;
