import React from 'react';
import { GetServerSideProps } from 'next';
import ReactMarkdown from 'react-markdown';
import Router from 'next/router';
import Layout from '../../components/Layout';
import { PostProps } from '../../components/Post';
import { useSession } from 'next-auth/react';
import prisma from '../../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: post,
  };
};

async function publishPost(id: string): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: "PUT"
  })
  await Router.push("/")
}

async function deletePost(id: string): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: 'DELETE',
  });
  Router.push('/');
}

const Post: React.FC<PostProps> = (props) => {
  
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.author?.email;
  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
    <Layout>
      <div>
        <p className="font-semibold text-gray-700">September XX 2022</p>
        <p className='font-bold text-2xl'>{title}</p>
        <p className="font-semibold text-lg mt-2 mb-4">By {props?.author?.name || "Unknown author"}</p>
        <ReactMarkdown children={props.content} />
        <div className="flex items center gap-2">
          {!props.published && userHasValidSession && postBelongsToUser && (
            <button 
              className='bg-black px-4 py-2 text-white font-semibold rounded-md' 
              onClick={() => publishPost(props.id)}
            >
              Publish
            </button>
          )}

          {
            userHasValidSession && postBelongsToUser && (
              <button 
                className='bg-red-500 px-4 py-2 text-white font-semibold rounded-md'
                onClick={() => deletePost(props.id)}
              >
                Delete
              </button>
            )
          }
        </div>
      </div>
    </Layout>
  )
}

export default Post
