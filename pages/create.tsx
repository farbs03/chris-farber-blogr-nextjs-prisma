import React, { useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';
import handle from './api/post';

const Draft: React.FC = () => {
    
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
        const body = { title, content };
        await fetch('/api/post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        await Router.push('/drafts');
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <Layout>
      <div>
        <form onSubmit={submitData} className='flex flex-col gap-4 max-w-md'>
          <p className='text-2xl font-bold'>New Draft</p>
          <input
            className='rounded-md ring-gray-300 ring-2 focus:ring-black transition duration-200 ease-in p-2'
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <textarea
            className='p-2 ring-gray-300 ring-2 rounded-md focus:ring-black transition duration-200 ease-in'
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
          />
          <div className="flex items-center gap-2">
            <input 
                className='px-4 py-2 bg-fuchsia-500 font-semibold text-white rounded-md cursor-pointer' 
                disabled={!content || !title} 
                type="submit" 
                value="Create" 
            />
            <a 
                className="px-4 py-2 bg-gray-200 font-semibold rounded-md" 
                href="#" 
                onClick={() => Router.push('/')}
            >
                Cancel
            </a>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default Draft