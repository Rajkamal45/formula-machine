"use client";
import React from 'react';
import FirstPage from './firstpage/page';
import KnowledgeJourneyPage from '@/app/Quotesection/page'
import BookPage from '@/components/BookPage'

const Home = () => {
  return (
    <main className="flex flex-col min-h-screen overflow-x-hidden">
      <FirstPage/>
      <KnowledgeJourneyPage/>
      <BookPage/>
    </main>
  );
};

export default Home;
