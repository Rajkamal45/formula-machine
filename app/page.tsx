"use client";
import React from 'react';
import FirstPage from './firstpage/page';
import KnowledgeJourneyPage from '@/app/Quotesection/page'

const Home = () => {
  return (
    <main className="flex flex-col min-h-screen overflow-x-hidden">
      <FirstPage/>
      <KnowledgeJourneyPage/>
    </main>
  );
};

export default Home;
