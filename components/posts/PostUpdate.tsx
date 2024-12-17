'use client';

import { ArrowLeftCircle, Loader2 } from "lucide-react";

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { IPost } from "@/lib/types";
import { Textarea } from "../ui/textarea";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import DeletePost from "./DeletePost";


const formSchema = z.object({
    title: z.string().min(1, {
      message: 'Title is required',
    }),
    body: z.string().min(1, {
      message: 'Body is required',
    }),
});

interface IProps{
    data:IPost
}

const PostUpdate = ({data}:IProps) => {
    const router = useRouter();
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            title:data?.title,
            body:data?.body
        }
    })
    const {isSubmitting} = form?.formState;
    async function handleSubmit(values:z.infer<typeof formSchema>){
        try{
            const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${data?.id}`,values);
            toast({
                title: 'Post has been updated successfully',
                description: `Updated`,
            });
            router.refresh()
        }catch(error){
            console.log(error);
            toast({
                title: 'error on update Post',
                description: `${error instanceof Error ? error?.message : 'Something went wrong'}`,
            });
        }
    }
  return (
    <div className="max-w-6xl px-5">
        <Link href="/">
        <ArrowLeftCircle size={18} />
        </Link>
      <h3 className='text-2xl my-4'>Edit Post</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'>
                  Title
                </FormLabel>
                <FormControl>
                  <Input
                    className='bg-slate-100 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0'
                    placeholder='Enter title'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='body'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'>
                  Body
                </FormLabel>
                <FormControl>
                <Textarea
                    className='bg-slate-100 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 !min-h-20'
                    placeholder='Enter body content '
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end items-end gap-2">
          <Button variant={"outline"} className=''>{isSubmitting ? (
                    <>
                    <Loader2 className="animate-spin" />
                    Please wait
                    </>
                ):(
                    "Update Post"
                )}</Button>
                <DeletePost post={data}/>
          </div>
          </form>
          </Form>
    </div>
    
  )
}

export default PostUpdate