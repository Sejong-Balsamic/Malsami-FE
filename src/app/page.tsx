import React from 'react';
import Nav from '@/components/common/Nav';
import Search from '@/components/landing/Search';
import HotData from '@/components/landing/HotData';
import HotQuestion from '@/components/landing/HotQuestion';
import Footer from '@/components/common/Footer';

function Page() {
  return (
    <div className="w-[1280px] h-[2274px] bg-white flex flex-col justify-center items-start inline-flex">
      <header className="w-[1280px] h-[475px] flex flex-col justify-center items-start">
        <Nav />
        <Search />
      </header>
      <main className="w-[1280px] h-[1679px] relative flex flex-col justify-start items-start inline-flex bg-gray-50">
        <HotData />
        <HotQuestion />
      </main>
      <Footer />
    </div>
  );
}

export default Page;
