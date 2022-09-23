import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from 'next-auth/react';

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  let left = (
    <div className="left">
      <Link href="/">
        <a 
          className="font-semibold text-gray-500 hover:text-black transition duration-200 ease-in" 
          data-active={isActive("/")}
        >
          Feed
        </a>
      </Link>
    </div>
  );

  let right = null;

  if (status === 'loading') {
    left = (
      <div className="left">
        <Link href="/">
          <a className="bold" data-active={isActive('/')}>
            Feed
          </a>
        </Link>

      </div>
    );
    right = (
      <div className="mr-auto">
        <p>Validating session ...</p>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className="ml-auto">
        <Link href="/api/auth/signin">
          <a 
            className='px-4 py-2 border-2 border-black rounded-md font-semibold hover:bg-black/10 transition duration-200 ease-in' 
            data-active={isActive('/signup')}
          >
            Log in
          </a>
        </Link>
      </div>
    );
  }

  if (session) {
    left = (
      <div className="flex items-center gap-2">
        <Link href="/">
          <a className="font-semibold" data-active={isActive('/')}>
            Feed
          </a>
        </Link>
        <Link href="/drafts">
          <a className='font-semibold' data-active={isActive('/drafts')}>My drafts</a>
        </Link>

      </div>
    );
    right = (
      <div className="ml-auto flex items-center gap-2">
        <p>
          {session.user.name} ({session.user.email})
        </p>
        <Link href="/create">
          <button className='px-4 py-2 border-2 border-black rounded-md font-semibold hover:bg-black/10 transition duration-200 ease-in' >
            <a>New post</a>
          </button>
        </Link>
        <button             
          className='px-4 py-2 border-2 border-black rounded-md font-semibold hover:bg-black/10 transition duration-200 ease-in' 
          onClick={() => signOut()}
        >
          <a>Log out</a>
        </button>
      </div>
    );
  }

  return (
    <nav className='flex items-center'>
      {left}
      {right}
    </nav>
  );
};

export default Header;
