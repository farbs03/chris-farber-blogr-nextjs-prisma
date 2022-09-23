import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"

import prisma from '../lib/prisma';

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { feed },
    revalidate: 10,
  };
};


type Props = {
  feed: PostProps[]
}

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div>
        <p className="text-xl font-bold mb-4">Public Feed</p>
        <main className='flex flex-col gap-4'>
          {props.feed.map((post) => (
            <div 
              key={post.id} 
              className="pointer-cursor select-none"
            >
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  )
}

export default Blog
