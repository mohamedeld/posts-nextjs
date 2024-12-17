import PostTable from "@/components/posts/PostTable";
import axios from "axios";
import Image from "next/image";

export default async function Home() {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts/');

  return (
    <div className="mt-[5rem]">
      <PostTable data={response?.data}/>
    </div>
  );
}
