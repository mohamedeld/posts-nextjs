"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IPost } from "@/lib/types";
import { Textarea } from "../ui/textarea";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  body: z.string().min(1, {
    message: "Body is required",
  }),
});

const CreatePost = () => {
    const {toast} = useToast();
    const router = useRouter();
    const [open,setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const {isSubmitting} = form?.formState;

  async function handleSubmit(values:z.infer<typeof formSchema>){
    try{
        const response = await axios.post(`https://jsonplaceholder.typicode.com/posts/`,values);
            toast({
                title: 'Post has been created successfully',
                description: `created`,
            });
            setOpen(false)
            router.refresh()
            form.reset()

    }catch(error){
        console.log(error)
        toast({
            title: 'error on update Post',
            description: `${error instanceof Error ? error?.message : 'Something went wrong'}`,
        });
    }
  }
  useEffect(()=>{
    form.reset();
  },[open])
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant={"outline"}>Add Post</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Post</DialogTitle>
          <DialogDescription>all fields are required</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-slate-100 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                      placeholder="Enter title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                    Body
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="bg-slate-100 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 !min-h-20"
                      placeholder="Enter body content "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end items-end">
              <Button disabled={isSubmitting} className="">{
                isSubmitting ? (
                    <>
                    <Loader2 className="animate-spin" />
                    Please wait
                    </>
                ):(
                    "Create Post"
                )
                }</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
