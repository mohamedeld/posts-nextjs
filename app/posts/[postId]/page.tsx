import PostUpdate from "@/components/posts/PostUpdate";
import axios from "axios";
import { redirect } from "next/navigation";

type IParams = {
    params:{
        postId:number
    }
}

const SinglePostPage = async ({params}:IParams) => {
    const {postId} = await params;
    if(!postId){
        redirect('/')
    }
    const response = await axios(`https://jsonplaceholder.typicode.com/posts/${postId}`);

  return (
    <div className="mt-[5rem] mx-auto">
        <PostUpdate data={response?.data}/>
    </div>
  )
}

export default SinglePostPage