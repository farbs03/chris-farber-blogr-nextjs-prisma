import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div className='h-screen bg-white px-2'>
    <div className="max-w-7xl w-full mx-auto py-6">
      <Header />
      <div className="mt-4">{props.children}</div>
    </div>
  </div>
);

export default Layout;
