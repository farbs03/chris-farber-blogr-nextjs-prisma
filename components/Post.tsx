import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <div 
      className='select-none cursor-pointer p-2 rounded-md hover:bg-gray-200 transition duration-200 ease-in flex items-center gap-4 max-w-xl'
      onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}
    >
      <p className='font-semibold text-sm text-gray-700'>September XX 2022</p>
      <div className='w-full'>
        <p className='font-bold text-lg hover:text-fuchsia-500 transition duration-200 ease-in  line-clamp-1'>{post.title}</p>
        <p className="font-semibold">By {authorName}</p>
        <p className="line-clamp-1">
          <ReactMarkdown children={post.content} />
        </p>
      </div>
    </div>
  );
};

export default Post;
